import os
from typing import Dict, Any, List
from ultralytics import YOLO
from app.config import get_settings
from loguru import logger
from app.utils.video_utils import extract_frames

settings = get_settings()

# Load YOLO model at service startup
try:
    logger.info(f"Loading YOLO model from {settings.YOLO_MODEL_PATH}")
    model = YOLO(settings.YOLO_MODEL_PATH)
except Exception as e:
    logger.error(f"Failed to load YOLO model: {e}")
    model = None


def predict_image(image_path: str) -> Dict[str, Any]:
    """
    Run YOLOv12 inference on a single image.
    Returns top label, confidence, and bounding box list.
    """
    if model is None:
        raise RuntimeError("YOLO model not loaded")

    results = model.predict(
        source=image_path,
        conf=settings.YOLO_CONFIDENCE_THRESHOLD,
        iou=settings.YOLO_IOU_THRESHOLD,
        verbose=False,
    )

    if not results:
        return {"label": "unknown", "confidence": 0.0, "bboxes": []}

    result = results[0]

    # Extract best prediction (highest confidence)
    if len(result.boxes) == 0:
        return {"label": "unknown", "confidence": 0.0, "bboxes": []}

    best_box = result.boxes[0]
    label = model.names[int(best_box.cls[0])]
    confidence = float(best_box.conf[0])

    bboxes: List[Dict[str, Any]] = []
    for box in result.boxes:
        bboxes.append({
            "label": model.names[int(box.cls[0])],
            "confidence": float(box.conf[0]),
            "bbox": box.xyxy[0].tolist(),  # [x1, y1, x2, y2]
        })

    return {
        "label": label,
        "confidence": confidence,
        "bboxes": bboxes,
    }


def predict_video(video_path: str, frame_interval: int = 30) -> Dict[str, Any]:
    """
    Run YOLO inference on a video by sampling frames.
    Returns majority label across frames and average confidence.
    """
    frames = extract_frames(video_path, interval=frame_interval)
    if not frames:
        return {"label": "unknown", "confidence": 0.0, "bboxes": []}

    label_counts = {}
    total_conf = 0.0
    total_preds = 0

    for frame in frames:
        res = predict_image(frame)
        if res["label"] != "unknown":
            label_counts[res["label"]] = label_counts.get(res["label"], 0) + 1
            total_conf += res["confidence"]
            total_preds += 1

    if total_preds == 0:
        return {"label": "unknown", "confidence": 0.0, "bboxes": []}

    # Most frequent label across frames
    final_label = max(label_counts, key=label_counts.get)
    avg_conf = total_conf / total_preds

    return {
        "label": final_label,
        "confidence": avg_conf,
        "bboxes": [],  # Could be extended with aggregated detections
    }

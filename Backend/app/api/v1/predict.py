import os
from fastapi import APIRouter, File, UploadFile, HTTPException, Depends
from fastapi.responses import JSONResponse
from app.config import get_settings
from app.utils.file_utils import save_upload
from app.services import yolo_service

router = APIRouter()
settings = get_settings()


@router.post("/predict")
async def predict(file: UploadFile = File(...)):
    """
    Upload an image or video for YOLOv12 classification.
    Supports .jpg, .jpeg, .png, .mp4
    """
    try:
        # Save file to static/uploads
        upload_dir = settings.UPLOAD_DIR
        os.makedirs(upload_dir, exist_ok=True)
        saved_path = save_upload(file, upload_dir)

        # Decide if image or video
        ext = os.path.splitext(saved_path)[-1].lower()
        if ext in [".jpg", ".jpeg", ".png"]:
            result = yolo_service.predict_image(saved_path)
        elif ext in [".mp4", ".avi", ".mov"]:
            result = yolo_service.predict_video(saved_path)
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type")


 # 👇 Add debug print here
        print(f"\n[DEBUG] Processed file: {file.filename}")
        print(f"[DEBUG] Prediction result: {result}\n")

        return JSONResponse(
            content={
                "filename": file.filename,
                "label": result["label"],
                "confidence": result["confidence"],
                "bboxes": result.get("bboxes", []),
                "instructions": f"Dispose in the {result['label']} recycling bin."
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {e}")
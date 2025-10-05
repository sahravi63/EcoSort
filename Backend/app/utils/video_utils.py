import cv2
import os

def extract_frames(video_path: str, interval: int = 30):
    """
    Extract frames from video every `interval` frames.
    Returns list of frame file paths.
    """
    frames = []
    vidcap = cv2.VideoCapture(video_path)
    count = 0

    while vidcap.isOpened():
        ret, frame = vidcap.read()
        if not ret:
            break
        if count % interval == 0:
            frame_path = f"{video_path}_frame_{count}.jpg"
            cv2.imwrite(frame_path, frame)
            frames.append(frame_path)
        count += 1

    vidcap.release()
    return frames

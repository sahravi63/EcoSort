import os
import uuid
from fastapi import UploadFile

def save_upload(file: UploadFile, upload_dir: str) -> str:
    """
    Save uploaded file to upload_dir with unique filename.
    Returns path to saved file.
    """
    ext = os.path.splitext(file.filename)[-1]
    filename = f"{uuid.uuid4().hex}{ext}"
    path = os.path.join(upload_dir, filename)

    with open(path, "wb") as buffer:
        buffer.write(file.file.read())

    return path

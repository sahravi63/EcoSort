from fastapi import APIRouter, Body, HTTPException
from app.services.tts_service import generate_tts

router = APIRouter()

@router.post("/tts")
async def generate_tts_api(text: str = Body(..., embed=True)):
    """
    Convert text into speech (mp3).
    Returns URL of generated audio file.
    """
    try:
        audio_url = generate_tts(text)
        return {
            "text": text,
            "audio_url": audio_url
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"TTS generation failed: {e}")

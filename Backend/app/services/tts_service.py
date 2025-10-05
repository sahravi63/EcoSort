import os
import uuid
from gtts import gTTS
from loguru import logger
from app.config import get_settings

settings = get_settings()


def generate_tts(text: str) -> str:
    """
    Generate speech audio from text using gTTS.
    Returns relative URL to the saved audio file.
    """
    try:
        os.makedirs(settings.TTS_AUDIO_DIR, exist_ok=True)

        # Unique filename
        filename = f"{uuid.uuid4().hex}.mp3"
        file_path = os.path.join(settings.TTS_AUDIO_DIR, filename)

        # Generate speech
        tts = gTTS(text=text, lang="en")
        tts.save(file_path)

        logger.info(f"TTS generated: {file_path}")

        # Return relative URL for frontend
        return f"/static/audio/{filename}"
    except Exception as e:
        logger.error(f"TTS generation failed: {e}")
        raise RuntimeError("TTS generation failed")

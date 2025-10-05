from pydantic import BaseModel

class TTSRequest(BaseModel):
    text: str

class TTSResponse(BaseModel):
    text: str
    audio_url: str

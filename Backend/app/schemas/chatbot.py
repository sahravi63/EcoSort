from pydantic import BaseModel
from typing import List

class ChatMessage(BaseModel):
    user_id: int
    message: str

class ChatResponse(BaseModel):
    response: str
    status: str

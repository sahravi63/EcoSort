from pydantic import BaseModel
from typing import Optional

class FeedbackRequest(BaseModel):
    predicted_label: str
    correct_label: Optional[str] = None
    user_id: Optional[str] = None

class FeedbackResponse(BaseModel):
    status: str
    predicted: str
    correct: Optional[str] = None
    user_id: Optional[str] = None

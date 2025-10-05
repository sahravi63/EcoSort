from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.schemas.feedback import FeedbackRequest, FeedbackResponse
from app.services.feedback_service import save_feedback, get_all_feedback
from app.database.session import get_db

router = APIRouter()

@router.post("/feedback", response_model=FeedbackResponse)
async def submit_feedback(feedback: FeedbackRequest, db: Session = Depends(get_db)):
    """
    Submit feedback for a prediction (correct label vs predicted label).
    """
    return save_feedback(db, feedback)

@router.get("/feedback", response_model=List[FeedbackResponse])
async def list_feedback(db: Session = Depends(get_db)):
    """
    Get all feedback entries.
    """
    try:
        feedback_entries = get_all_feedback(db)
        return [
            FeedbackResponse(
                status="success",
                predicted=f.predicted_label,
                correct=f.correct_label,
                user_id=f.user_id,
            )
            for f in feedback_entries
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch feedback: {e}")

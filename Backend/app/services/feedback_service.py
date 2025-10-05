from sqlalchemy.orm import Session
from app.models.feedback_m import Feedback
from app.schemas.feedback import FeedbackRequest, FeedbackResponse
from loguru import logger

def save_feedback(db: Session, feedback_data: FeedbackRequest) -> FeedbackResponse:
    """
    Save user feedback into the database.
    """
    try:
        # Corrected: Use the imported class name, Feedback_m
        feedback = Feedback_m(
            user_id=feedback_data.user_id,
            predicted_label=feedback_data.predicted_label,
            correct_label=feedback_data.correct_label,
        )
        db.add(feedback)
        db.commit()
        db.refresh(feedback)

        logger.info(f"Feedback stored: {feedback.id}")
        return FeedbackResponse(
            status="success",
            predicted=feedback.predicted_label,
            correct=feedback.correct_label,
            user_id=feedback.user_id,
        )
    except Exception as e:
        logger.error(f"Error saving feedback: {e}")
        db.rollback()
        return FeedbackResponse(
            status="failed",
            predicted=feedback_data.predicted_label,
            correct=feedback_data.correct_label,
            user_id=feedback_data.user_id,
        )

def get_all_feedback(db: Session):
    """
    Retrieve all feedback entries.
    Useful for analytics and model retraining.
    """
    # Corrected: Use the imported class name, Feedback_m
    return db.query(Feedback_m).all()

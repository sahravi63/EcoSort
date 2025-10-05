# app/models/feedback.py
from sqlalchemy import Column, Integer, String, DateTime, func
from app.database.session import Base

class Feedback(Base):
    __tablename__ = "feedback"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String(255), nullable=True)           # Added length
    predicted_label = Column(String(255), nullable=False)  # Added length
    correct_label = Column(String(255), nullable=True)     # Added length
    created_at = Column(DateTime(timezone=True), server_default=func.now())

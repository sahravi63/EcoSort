from sqlalchemy import Column, Integer, ForeignKey, Date, DateTime, func
from sqlalchemy.orm import relationship
from app.database.session import Base

class Leaderboard(Base):
    __tablename__ = "leaderboard"

    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True, index=True)
    score = Column(Integer, default=0)
    items_analyzed = Column(Integer, default=0)
    streak = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", backref="leaderboard_entry")

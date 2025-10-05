from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.services.gamification_service import GamificationService
from app.schemas.gamification import LeaderboardResponse, UserStats, AnalysisRequest, LeaderboardUpdateRequest
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

# -------------------- LEADERBOARD --------------------
@router.get("/leaderboard", response_model=LeaderboardResponse)
def get_leaderboard(db: Session = Depends(get_db)):
    service = GamificationService(db)
    try:
        return service.get_leaderboard()
    except Exception as e:
        db.rollback()
        logger.error(f"Leaderboard error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch leaderboard")

@router.post("/leaderboard")
def update_leaderboard(data: LeaderboardUpdateRequest, db: Session = Depends(get_db)):
    service = GamificationService(db)
    try:
        return service.update_leaderboard(
            user_id=data.user_id,
            score=data.score,
            items_analyzed=data.items_analyzed,
        )
    except Exception as e:
        db.rollback()
        logger.error(f"Leaderboard update error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update leaderboard")

@router.put("/leaderboard")
def update_leaderboard_stats(data: LeaderboardUpdateRequest, db: Session = Depends(get_db)):
    service = GamificationService(db)
    try:
        return service.update_leaderboard(
            user_id=data.user_id,
            score=data.score,
            items_analyzed=data.items_analyzed
        )
    except Exception as e:
        db.rollback()
        logger.error(f"Leaderboard update error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update leaderboard")

# -------------------- ANALYSIS --------------------
@router.post("/leaderboard/analysis")
def record_analysis(data: AnalysisRequest, db: Session = Depends(get_db)):
    service = GamificationService(db)
    try:
        return service.add_analysis_points(user_id=data.user_id)
    except Exception as e:
        db.rollback()
        logger.error(f"Analysis points error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# -------------------- USER STATS --------------------
@router.get("/user/{user_id}/stats", response_model=UserStats)
def get_user_stats(user_id: int, db: Session = Depends(get_db)):
    service = GamificationService(db)
    try:
        return service.get_user_stats(user_id)
    except Exception as e:
        db.rollback()
        logger.error(f"User stats error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch user stats")

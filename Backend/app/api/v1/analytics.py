# app/api/v1/analytics.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/analytics")
async def get_analytics():
    """
    Returns system analytics for admin dashboard.
    TODO: fetch from analytics_service.py + database.
    """
    return {
        "total_predictions": 120,
        "most_common_label": "plastic",
        "accuracy": 0.87,
    }

from pydantic import BaseModel

class AnalyticsResponse(BaseModel):
    total_predictions: int
    most_common_label: str
    accuracy: float

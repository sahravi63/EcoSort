from pydantic import BaseModel
from typing import List

class LeaderboardEntry(BaseModel):
    user_id: int
    username: str
    score: int
    items_analyzed: int
    rank: int

    class Config:
        orm_mode = True

class LeaderboardResponse(BaseModel):
    entries: List[LeaderboardEntry]

class UserStats(BaseModel):
    user_id: int
    score: int
    items_analyzed: int
    rank: int


class LeaderboardUpdateRequest(BaseModel):
    user_id: int
    score: int
    items_analyzed: int

class AnalysisRequest(BaseModel):
    user_id: int
    # optional, can be removed if backend counts itself
    analysis_count_today: int = 0
from pydantic import BaseModel

class PredictRequest(BaseModel):
    file_path: str

class PredictResponse(BaseModel):
    label: str
    confidence: float
    instructions: str

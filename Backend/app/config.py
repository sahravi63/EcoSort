# app/config.py
import os
from functools import lru_cache
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # App
    APP_NAME: str = "EcoSort"
    APP_ENV: str = os.getenv("APP_ENV", "development")
    APP_DEBUG: bool = APP_ENV != "production"
    APP_HOST: str = os.getenv("APP_HOST", "0.0.0.0")
    APP_PORT: int = int(os.getenv("APP_PORT", 8000))

    # Database
    DB_USER: str = os.getenv("DB_USER", "root")
    DB_PASSWORD: str = os.getenv("DB_PASSWORD", "")
    DB_HOST: str = os.getenv("DB_HOST", "localhost")
    DB_NAME: str = os.getenv("DB_NAME", "ecosort_db")
    DB_PORT: int = int(os.getenv("DB_PORT", 3306))

    @property
    def DATABASE_URL(self) -> str:
        """Build DB connection string dynamically (supports MySQL with/without password)."""
        if self.DB_USER and self.DB_NAME:
            if self.DB_PASSWORD:
                return f"mysql+pymysql://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
            else:
                return f"mysql+pymysql://{self.DB_USER}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
        return "sqlite:///./app.db"

    # YOLO
    YOLO_MODEL_PATH: str = os.getenv("YOLO_MODEL_PATH", "./app/Trained_model/best_model.pt")
    YOLO_CONFIDENCE_THRESHOLD: float = float(os.getenv("YOLO_CONFIDENCE_THRESHOLD", 0.5))
    YOLO_IOU_THRESHOLD: float = float(os.getenv("YOLO_IOU_THRESHOLD", 0.45))

    # Gemini API
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    GEMINI_MODEL: str = os.getenv("GEMINI_MODEL", "gemini-1.5-pro")

    # TTS
    TTS_PROVIDER: str = os.getenv("TTS_PROVIDER", "gtts")
    TTS_AUDIO_DIR: str = os.getenv("TTS_AUDIO_DIR", "./app/static/audio")

    # Gamification
    ALLOWED_EXTENSIONS: str = os.getenv("ALLOWED_EXTENSIONS", "jpg,jpeg,png,mp4")
    POINTS_PER_CORRECT: int = int(os.getenv("POINTS_PER_CORRECT", 10))
    BADGE_THRESHOLDS: str = os.getenv("BADGE_THRESHOLDS", "50,100,200")

    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "changeme")

    # Paths
    BASE_DIR: str = os.path.dirname(os.path.abspath(__file__))
    STATIC_DIR: str = os.path.join(BASE_DIR, "static")
    UPLOAD_DIR: str = os.path.join(STATIC_DIR, "uploads")

    model_config = {
        "env_file": ".env",
        "extra": "allow",  # ✅ allows undeclared vars
    }


@lru_cache()
def get_settings() -> Settings:
    return Settings()

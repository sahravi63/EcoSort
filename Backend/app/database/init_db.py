from app.config import Base, engine
from app.models.user import User
from app.models.feedback_m import Feedback
from app.models.leaderboard import Leaderboard
from loguru import logger

def init_db():
    logger.info("Creating tables in EcoSortDB...")
    Base.metadata.create_all(bind=engine)
    logger.info("✅ Tables created successfully!")

if __name__ == "__main__":
    init_db()

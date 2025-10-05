# app/dependencies.py
from typing import Generator, Optional
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy import create_engine
from contextlib import contextmanager
from app.config import get_settings
from loguru import logger

settings = get_settings()

# Create SQLAlchemy Engine and SessionLocal
# Notes:
# - echo=False by default; set to True temporarily if debugging SQL statements.
# - pool_pre_ping helps avoid stale connections in dev envs.
engine = create_engine(
    settings.DATABASE_URL,
    echo=False,
    pool_pre_ping=True,
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
    expire_on_commit=False,
)

def get_db() -> Generator[Session, None, None]:
    """
    FastAPI dependency that yields a SQLAlchemy DB session and ensures proper cleanup.
    Usage in path operation:
        def endpoint(db: Session = Depends(get_db)):
            ...
    """
    db: Optional[Session] = None
    try:
        db = SessionLocal()
        yield db
    except Exception as exc:
        logger.exception("Database session error: {}", exc)
        raise
    finally:
        if db:
            db.close()

# Auth placeholder: replace with real auth flow when ready
def get_current_user():
    """
    Placeholder dependency for auth. Returns None until implemented.
    Replace with proper JWT/session auth later.
    """
    return None

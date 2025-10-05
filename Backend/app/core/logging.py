# app/core/logging.py
from loguru import logger
import sys

# Configure Loguru globally
logger.remove()  # remove default handler
logger.add(
    sys.stdout,
    colorize=True,
    format="<green>{time:YYYY-MM-DD HH:mm:ss}</green> | "
           "<level>{level: <8}</level> | "
           "<cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - "
           "<level>{message}</level>",
    level="DEBUG",
)

# Optional: file logging
logger.add("logs/app.log", rotation="1 MB", retention="7 days", level="INFO")

__all__ = ["logger"]

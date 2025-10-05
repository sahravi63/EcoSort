import google.generativeai as genai
from app.config import get_settings
from loguru import logger

settings = get_settings()

# Configure Gemini client
try:
    if settings.GEMINI_API_KEY:
        genai.configure(api_key=settings.GEMINI_API_KEY)
        logger.info("Gemini API client configured")
    else:
        logger.warning("Gemini API key not found! Chatbot will not work properly.")
except Exception as e:
    logger.error(f"Gemini API init failed: {e}")


def get_chatbot_response(message: str) -> str:
    """
    Send user message to Gemini API and return reply.
    Fallback: generic static response.
    """
    if not settings.GEMINI_API_KEY:
        return "Chatbot unavailable (missing API key). Please try later."

    try:
        model = genai.GenerativeModel(settings.GEMINI_MODEL)
        response = model.generate_content(
            f"You are EcoSortAI, an assistant that helps with waste management and recycling.\n"
            f"User: {message}\nAssistant:"
        )
        return response.text if response and hasattr(response, "text") else "I couldn't generate a response."
    except Exception as e:
        logger.error(f"Gemini API error: {e}")
        return "Sorry, I had trouble answering. Please try again later."

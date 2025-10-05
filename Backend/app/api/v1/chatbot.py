from fastapi import APIRouter, Body
from app.services.chatbot_service import get_chatbot_response

router = APIRouter()

@router.post("/chat")
async def chat(message: str = Body(..., embed=True)):
    """
    Chatbot endpoint powered by Gemini API.
    """
    bot_reply = get_chatbot_response(message)
    return {
        "user_message": message,
        "bot_reply": bot_reply
    }

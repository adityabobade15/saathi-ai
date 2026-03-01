from fastapi import APIRouter
from pydantic import BaseModel

from utils.ollama import ask_mistral
from models.emotion_model import detect_emotion

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str
    emotion: str

@router.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    emotion = detect_emotion(req.message)

    emotion_hint = {
        "sad": "User is feeling sad. Be extra empathetic.",
        "anxious": "User is feeling anxious. Be calming.",
        "angry": "User is feeling frustrated. Be patient.",
        "neutral": "Normal supportive response."
    }

    final_message = f"""
Emotion context: {emotion_hint[emotion]}
User says: {req.message}
"""

    reply = ask_mistral(final_message)

    return {
        "reply": reply,
        "emotion": emotion
    }
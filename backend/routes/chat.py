from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from models.emotion_model import detect_emotion
from models.sentiment_model import analyze_sentiment
from utils.crisis_check import check_crisis

chat_router = APIRouter()

# ✅ Request body schema (VERY IMPORTANT)
class ChatRequest(BaseModel):
    message: str


@chat_router.post("/")
def chat(payload: ChatRequest):
    text = payload.message.strip()

    if not text:
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    # Crisis detection
    crisis = check_crisis(text)

    # Emotion detection
    emotions = detect_emotion(text)
    emotion = emotions[0] if emotions else {"label": "neutral", "score": 0.0}

    # Sentiment analysis
    sentiment = analyze_sentiment(text)

    # Reply logic
    if crisis:
        reply = (
            "I'm really sorry you're feeling this way. "
            "You are not alone. Please reach out to someone you trust "
            "or a mental health helpline immediately."
        )
    else:
        reply = (
            f"It seems like you're feeling {emotion['label']}. "
            "Do you want to talk about it?"
        )

    return {
        "reply": reply,
        "emotion": emotion,
        "sentiment": sentiment,
        "crisis": crisis
    }

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime

mood_router = APIRouter()

# Temporary in-memory storage (later replace with DB)
mood_history = []

# ✅ Request schema
class MoodRequest(BaseModel):
    emotion: str
    sentiment: float


@mood_router.post("/log")
def log_mood(payload: MoodRequest):
    if not payload.emotion:
        raise HTTPException(status_code=400, detail="Emotion is required")

    entry = {
        "timestamp": datetime.utcnow().isoformat(),
        "emotion": payload.emotion,
        "sentiment": payload.sentiment
    }

    mood_history.append(entry)
    return {"status": "Mood saved successfully"}


@mood_router.get("/history")
def get_history():
    return mood_history

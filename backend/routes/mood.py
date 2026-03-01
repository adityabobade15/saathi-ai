from fastapi import APIRouter
from pydantic import BaseModel

mood_router = APIRouter()

# in-memory storage (prototype)
MOOD_HISTORY = []


class MoodRequest(BaseModel):
    emotion: str
    sentiment: float


@mood_router.post("/log")
def log_mood(payload: MoodRequest):
    entry = {
        "emotion": payload.emotion,
        "sentiment": payload.sentiment
    }
    MOOD_HISTORY.append(entry)
    return {"status": "saved", "data": entry}


@mood_router.get("/history")
def get_mood_history():
    return MOOD_HISTORY

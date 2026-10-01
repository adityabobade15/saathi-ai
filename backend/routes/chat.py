from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional
from utils.groq_client import ask_mixtral

router = APIRouter()

USER_MEMORY = {}


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    message: Optional[str] = ""
    uid: Optional[str] = None
    history: Optional[List[ChatMessage]] = None


class ChatResponse(BaseModel):
    reply: str
    crisis: bool
    emotion: str


def detect_crisis_level(text: str) -> int:
    t = text.lower()

    strong_signals = [
        "kill myself", "end my life", "suicide", "self harm", "self-harm",
        "want to die", "wanna die", "die today", "end it all", "ending it all",
        "don't want to live", "dont want to live", "not want to live",
        "don't want to be here", "dont want to be here", "no point living",
        "no point in living", "hurt myself", "harm myself",
        "take my own life", "better off dead", "cant do this anymore",
        "can't do this anymore",
    ]

    medium_signals = [
        "no reason to live", "tired of living", "life is pointless",
        "can't go on", "cant go on", "want to disappear",
        "give up on life", "nothing matters anymore", "feel hopeless",
        "no one would care", "everyone better off without me",
    ]

    if any(p in t for p in strong_signals):
        return 2
    if any(p in t for p in medium_signals):
        return 1
    return 0


def detect_emotion(text: str) -> str:
    t = text.lower()

    if any(w in t for w in ["sad", "low", "down", "lonely", "cry", "depressed"]):
        return "sad"
    if any(w in t for w in ["stress", "stressed", "anxious", "panic", "worried", "nervous"]):
        return "anxious"
    if any(w in t for w in ["angry", "frustrated", "mad"]):
        return "angry"
    if any(w in t for w in ["happy", "good", "fine", "great", "calm", "relaxed"]):
        return "happy"
    return "neutral"


@router.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    user_message = (req.message or "").strip()
    user_id = req.uid or "default"
    history = [{"role": h.role, "content": h.content} for h in (req.history or [])]

    if not user_message:
        reply = ask_mixtral(
            "Start conversation yourself. Be cute, soft, teen-friendly. "
            "Ask about the user's day in 1-2 lines with emojis.",
            history=history,
        )
        return {"reply": reply, "crisis": False, "emotion": "neutral"}

    crisis_level = detect_crisis_level(user_message)
    emotion = detect_emotion(user_message)

    # read the previous emotion BEFORE overwriting it
    previous_emotion = USER_MEMORY.get(user_id, {}).get("last_emotion")
    USER_MEMORY[user_id] = {"last_emotion": emotion, "last_topic": user_message[:50]}

    if crisis_level == 1:
        reply = ask_mixtral(
            "The user feels emotionally overwhelmed. Be extra gentle and "
            f"supportive. Ask one soft question.\nUser: {user_message}",
            history=history,
        )
        return {"reply": reply, "crisis": False, "emotion": emotion}

    context = ""
    if previous_emotion and previous_emotion != "neutral":
        context = f"Earlier the user felt {previous_emotion}. Be mindful of this.\n"

    reply = ask_mixtral(
        f"{context}User says: {user_message}\nReply in short, cute, caring style.",
        history=history,
    )
    return {"reply": reply, "crisis": crisis_level == 2, "emotion": emotion}
from fastapi import APIRouter
from pydantic import BaseModel
from backend.utils.groq_client import ask_mixtral
# ===== In-memory user memory (MVP) =====
# Later you can move this to Firebase / DB
USER_MEMORY = {}

router = APIRouter()


class ChatRequest(BaseModel):
    message: str | None = ""


class ChatResponse(BaseModel):
    reply: str
    crisis: bool


# ===== Smarter Crisis Detection =====
def detect_crisis_level(text: str) -> int:
    t = text.lower()

    strong_signals = [
        "kill myself",
        "end my life",
        "suicide",
        "self harm",
        "want to die",
        "die today",
    ]

    medium_signals = [
        "no reason to live",
        "tired of living",
        "life is pointless",
        "can't go on",
        "want to disappear",
    ]

    if any(p in t for p in strong_signals):
        return 2  # 🚨 real crisis

    if any(p in t for p in medium_signals):
        return 1  # ⚠️ emotional distress

    return 0


# ===== Simple Emotion Detection =====
def detect_emotion(text: str) -> str:
    t = text.lower()

    if any(w in t for w in ["sad", "low", "down", "lonely"]):
        return "sad"

    if any(w in t for w in ["stress", "stressed", "anxious", "panic"]):
        return "anxious"

    if any(w in t for w in ["happy", "good", "fine"]):
        return "happy"

    return "neutral"


@router.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    user_message = (req.message or "").strip()
    user_id = "default"  # 🔐 later replace with real user/session id

    # ===== Auto-conversation starter =====
    if not user_message:
        reply = ask_mixtral(
            "Start conversation yourself. Be cute, soft, teen-friendly. "
            "Ask about the user's day in 1–2 lines with emojis."
        )
        return {"reply": reply, "crisis": False}

    # ===== Crisis detection =====
    crisis_level = detect_crisis_level(user_message)

    # ===== Emotion detection =====
    emotion = detect_emotion(user_message)

    # ===== Update memory =====
    USER_MEMORY[user_id] = {
        "last_emotion": emotion,
        "last_topic": user_message[:50],
    }

    previous_emotion = USER_MEMORY.get(user_id, {}).get("last_emotion")

    # ===== Soft response for emotional distress (NO popup) =====
    if crisis_level == 1:
        reply = ask_mixtral(
            f"The user feels emotionally overwhelmed. "
            f"Be extra gentle and supportive. "
            f"Ask one soft question.\nUser: {user_message}"
        )
        return {"reply": reply, "crisis": False}

    # ===== Normal / Crisis-level response =====
    context = ""
    if previous_emotion and previous_emotion != "neutral":
        context = f"Earlier the user felt {previous_emotion}. Be mindful of this.\n"

    reply = ask_mixtral(
        f"{context}User says: {user_message}\n"
        f"Reply in short, cute, caring style."
    )

    return {
        "reply": reply,
        "crisis": crisis_level == 2,  # 🚨 popup only for real crisis
    }
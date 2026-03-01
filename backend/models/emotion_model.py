# backend/models/emotion_model.py
# NO transformers, NO ML, NO HuggingFace

def detect_emotion(text: str) -> str:
    text = text.lower()

    if any(word in text for word in ["sad", "lonely", "cry", "depressed", "low"]):
        return "sad"

    if any(word in text for word in ["anxious", "stress", "panic", "worried"]):
        return "anxious"

    if any(word in text for word in ["angry", "frustrated", "mad"]):
        return "angry"

    return "neutral"
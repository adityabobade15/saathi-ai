# backend/utils/crisis.py

def detect_crisis_level(text: str) -> int:
    t = text.lower()

    strong_signals = [
        "kill myself",
        "end my life",
        "suicide",
        "self harm",
        "want to die",
        "die today"
    ]

    medium_signals = [
        "no reason to live",
        "tired of living",
        "life is pointless",
        "can't go on",
        "want to disappear"
    ]

    if any(p in t for p in strong_signals):
        return 2   # 🚨 crisis

    if any(p in t for p in medium_signals):
        return 1   # ⚠️ distress

    return 0
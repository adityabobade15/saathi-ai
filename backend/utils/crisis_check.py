CRISIS_KEYWORDS = [
    "kill myself",
    "suicide",
    "end my life",
    "hurt myself",
    "i want to die",
    "no reason to live"
]

def check_crisis(text: str) -> bool:
    text = text.lower()
    return any(word in text for word in CRISIS_KEYWORDS)

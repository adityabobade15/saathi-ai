from transformers import pipeline

emotion_classifier = None

def load_emotion_model():
    """
    Lazy-load the emotion detection model.
    Loads only once to avoid startup freeze.
    """
    global emotion_classifier
    if emotion_classifier is None:
        emotion_classifier = pipeline(
            "text-classification",
            model="j-hartmann/emotion-english-distilroberta-base",
            top_k=None
        )

def detect_emotion(text: str):
    """
    Detect emotions from input text.
    Returns a sorted list of emotions by confidence.
    """
    load_emotion_model()

    emotions = emotion_classifier(text)[0]

    # Sort emotions by score (highest first)
    emotions = sorted(emotions, key=lambda x: x["score"], reverse=True)

    return emotions

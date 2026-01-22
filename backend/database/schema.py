def mood_schema(user_id, emotion, sentiment, message):
    return {
        "user_id": user_id,
        "emotion": emotion,
        "sentiment": sentiment,
        "message": message
    }

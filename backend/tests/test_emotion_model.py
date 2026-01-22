from models.emotion_model import detect_emotion

def test_emotion():
    result = detect_emotion("I feel very sad today")
    assert len(result) > 0

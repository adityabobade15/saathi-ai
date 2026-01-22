from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_mood():
    response = client.post("/api/mood/log", json={
        "emotion": "sadness",
        "sentiment": -0.7
    })
    assert response.status_code == 200

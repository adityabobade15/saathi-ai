from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_chat():
    response = client.post("/api/chat/", json={"message": "I feel lonely"})
    assert response.status_code == 200

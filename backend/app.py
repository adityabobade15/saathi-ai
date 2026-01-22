from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.chat import chat_router
from routes.mood import mood_router

app = FastAPI(
    title="AI Mental Health Companion",
    description="Backend API for emotion-aware mental health assistant",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router, prefix="/api/chat", tags=["Chat"])
app.include_router(mood_router, prefix="/api/mood", tags=["Mood"])

@app.get("/")
def root():
    return {"status": "FastAPI backend is running"}

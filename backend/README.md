⚙️ Backend – AI Mental Health Companion

This folder contains the backend implementation of the AI-powered Mental Health Companion.
The backend is responsible for emotion detection, sentiment analysis, crisis detection, mood tracking, and serving APIs consumed by the React frontend.

🧠 Backend Responsibilities

Handle user messages
Detect emotions using NLP models
Analyze sentiment
Detect crisis-level inputs
Generate empathetic responses
Store and retrieve mood history
Expose REST APIs for frontend integration

🛠️ Tech Stack (Backend)

Python
FastAPI
Hugging Face Transformers (Emotion Detection)
VADER Sentiment Analysis
Uvicorn (ASGI Server)
In-memory storage (prototype phase)

📂 Folder Structure
backend/
│
├── app.py                 # Main FastAPI application
│
├── routes/
│   ├── chat.py             # Chat API routes
│   └── mood.py             # Mood logging & history routes
│
├── models/
│   ├── emotion_model.py    # Transformer-based emotion detection
│   └── sentiment_model.py  # VADER sentiment analysis
│
├── utils/
│   └── crisis_check.py     # Crisis/self-harm detection logic
│
├── database/               # Reserved for future DB integration
│
├── requirements.txt
└── README.md

🚀 Implemented APIs
🔹 Chat API

Endpoint:
POST /api/chat/


Purpose:

Analyze user message
Detect emotion
Analyze sentiment
Detect crisis intent
Return empathetic AI response

Sample Request:

{
  "message": "I feel anxious and stressed"
}


Sample Response:

{
  "reply": "It seems like you're feeling fear. Do you want to talk about it?",
  "emotion": {
    "label": "fear",
    "score": 0.98
  },
  "sentiment": -0.52,
  "crisis": false
}

🔹 Mood Logging API

Endpoint:
POST /api/mood/log


Purpose:

Store emotion and sentiment data

Sample Request:

{
  "emotion": "fear",
  "sentiment": -0.52
}

🔹 Mood History API

Endpoint:
GET /api/mood/history


Purpose:

Retrieve stored mood history for dashboard visualization

🧠 Emotion & Sentiment Models

Emotion Detection

Model: j-hartmann/emotion-english-distilroberta-base
Loaded lazily (loaded only once)
Returns ranked emotion scores
Sentiment Analysis
VADER Sentiment Analyzer
Returns compound score between -1 and +1

⚠️ Data Storage (Current Phase)

Mood data is stored in memory
Data resets when backend restarts
Used only for prototyping and testing

▶️ How to Run Backend
cd backend
venv\Scripts\activate
python -m uvicorn app:app --reload


Backend URL:
http://127.0.0.1:8000


Swagger Docs:
http://127.0.0.1:8000/docs

🔒 CORS Configuration
CORS is enabled to allow the React frontend to connect safely.

🚧 Future Backend Enhancements

Planned improvements for upcoming phases:

Persistent database (SQLite / Firebase / MongoDB)
User authentication & authorization
User-specific mood history
Context-aware conversation memory
Improved crisis escalation handling
API rate limiting & security
Cloud deployment (Render / Railway)


📌 Backend Developer Note
This backend is designed with modular architecture, clear API contracts, and scalability in mind, making it suitable for further expansion and production deployment.

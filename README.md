# 🧠 AI-Powered Mental Health Companion

An AI-powered mental health companion designed to provide emotional support, mood tracking, and wellness guidance through intelligent conversation.
This project is built collaboratively with a clear separation of backend and frontend responsibilities.


📌 Project Objective

Many students and professionals experience stress, anxiety, loneliness, or emotional burnout but hesitate to seek help due to stigma or lack of access.

This project aims to:
Detect user emotions from text
Provide empathetic AI responses
Trigger calming exercises when needed
Track mood history over time
Support early crisis detection


🧑‍🤝‍🧑 Team Collaboration

Role	Responsibility
Backend Developer (Me)	FastAPI, AI models, APIs, data handling
Frontend Developer (My Friend)	React UI, UX, animations, dashboard

🛠️ Tech Stack
🔹 Backend

FastAPI (Python)
Hugging Face Transformers (Emotion Detection)
VADER Sentiment Analysis
Crisis Detection Logic
In-memory storage (current phase)
Uvicorn ASGI Server

🔹 Frontend

React.js
Modular Components
Chat UI with typing animation
Breathing & grounding modals
Dashboard structure

📂 Project Structure
mental_health_companion/
│
├── backend/
│   ├── app.py
│   ├── routes/
│   │   ├── chat.py
│   │   └── mood.py
│   ├── models/
│   │   ├── emotion_model.py
│   │   └── sentiment_model.py
│   ├── utils/
│   │   └── crisis_check.py
│   ├── database/
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── utils/
│   └── package.json
│
└── README.md

✅ Features Implemented (Current Phase)
🔧 Backend (Completed by Me)

FastAPI backend setup

/api/chat endpoint:

Emotion detection using Transformer model
Sentiment analysis
Crisis detection
Empathetic AI reply
/api/mood/log endpoint to store mood data
/api/mood/history endpoint to retrieve mood history
CORS configuration for frontend connection
Swagger API documentation
Backend–frontend integration tested successfully


🎨 Frontend (Completed by My Friend)

Chat interface with user & AI messages
Typing animation while AI responds
Automatic breathing exercise trigger for anxiety/fear
Crisis modal for high-risk messages
Grounding and calming modals
Dashboard page structure


Smooth UI/UX flow

🔄 Current Data Handling
Mood data is currently stored in-memory
Data resets when backend restarts
This is intentional for the prototype phase


🚀 Future Enhancements (Planned)

🔮 Backend – Future Work (Me)

Persistent database integration (SQLite / Firebase / MongoDB)
User authentication & profiles
Per-user mood history
Context-aware conversation memory
Advanced crisis escalation logic
API rate limiting & security
Deployment on cloud (Render / Railway)

🎨 Frontend – Future Work (My Friend)

Mood history visualization (graphs & charts)
Weekly / monthly mood dashboard
Login & signup UI
Improved animations & accessibility
Offline fallback UI
Production deployment (Vercel / Netlify)


▶️ How to Run the Project

Backend

cd backend
venv\Scripts\activate
python -m uvicorn app:app --reload

Frontend

cd frontend
npm install
npm run dev


Backend runs on:
http://127.0.0.1:8000


Swagger Docs:
http://127.0.0.1:8000/docs


Frontend runs on:
http://localhost:5173

📈 Project Status
✅ MVP completed
✅ Frontend ↔ Backend connected
🚧 Database persistence in progress
🚧 Dashboard visualization planned
🚀 Deployment upcoming

📝 Note
This project is built for educational and supportive purposes only and is not a replacement for professional mental health services.

🙌 Acknowledgements
Built collaboratively with a focus on learning full-stack development, AI integration, and responsible mental health design.

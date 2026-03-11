from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from routes.users import router as users_router
from routes.chat import router as chat_router
from routes.chat_hybrid import router as hybrid_router

app = FastAPI(title="Real Backend Saathi")

origins = [
    "http://localhost:5173",
    "https://saathi-ai-sigma.vercel.app",
    "https://saathi-18eu2xckd-aditya-bobades-projects.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "Backend running"}

# Health endpoint for uptime monitoring
@app.api_route("/health", methods=["GET", "HEAD"])
async def health(request: Request):
    return {"status": "ok"}

app.include_router(users_router)
app.include_router(chat_router)
app.include_router(hybrid_router)
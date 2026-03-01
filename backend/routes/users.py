from fastapi import APIRouter
from datetime import datetime
from config.firebase import db

# ✅ THIS VARIABLE NAME IS REQUIRED
router = APIRouter()

@router.post("/users/create")
def create_user(payload: dict):
    uid = payload["uid"]
    email = payload["email"]
    name = payload.get("name", "Friend")

    users_ref = db.collection("users")

    # Check if user already exists
    existing = users_ref.where("uid", "==", uid).limit(1).stream()
    if list(existing):
        users_ref.document(uid).update({
            "last_active": datetime.utcnow()
        })
        return {"status": "existing user"}

    # Create new user
    users_ref.document(uid).set({
        "uid": uid,
        "email": email,
        "name": name,
        "role": "user",
        "created_at": datetime.utcnow(),
        "last_active": datetime.utcnow()
    })

    return {"status": "user created"}
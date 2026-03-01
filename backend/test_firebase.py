from config.firebase import db

doc_ref = db.collection("test").document("ping")
doc_ref.set({"status": "firebase connected"})

print("Firebase connected successfully")
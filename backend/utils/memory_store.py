# backend/utils/memory_store.py

memory = {}

def get_memory(user_id: str):
    return memory.get(user_id, {})

def update_memory(user_id: str, emotion: str = None, topic: str = None):
    if user_id not in memory:
        memory[user_id] = {}

    if emotion:
        memory[user_id]["emotion"] = emotion

    if topic:
        memory[user_id]["topic"] = topic
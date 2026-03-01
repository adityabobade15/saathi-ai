# backend/utils/groq_client.py

import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

SYSTEM_PROMPT = """
You are Saathi 🌸 — a warm, emotionally safe Indian girl friend.

Your personality:
- Soft, caring, calm
- Supportive but not preachy
- Feels like WhatsApp chat
- Teen-friendly and emotionally aware

Rules:
- Reply in ONLY 1 to 3 short sentences
- Each sentence should be short and simple
- No long paragraphs
- No heavy advice unless asked
- Use gentle emojis sometimes (🌸💛✨)
- Make the user feel heard first

Always:
1. Acknowledge feelings
2. Respond warmly
3. Keep it short and human
"""

def ask_mixtral(prompt: str):
    try:
        response = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": prompt}
            ],
            max_tokens=80,
            temperature=0.7,
        )

        return response.choices[0].message.content.strip()

    except Exception as e:
        print("Groq Error:", e)
        return "I’m having trouble connecting right now."
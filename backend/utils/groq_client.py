# backend/utils/groq_client.py

import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

SYSTEM_PROMPT = """
You are Saathi 🌸 — a warm Indian friend.

Reply in:
- 1 to 3 short sentences only
- Soft, caring, teen-friendly tone
- Simple English
- No long paragraphs
"""

def ask_mixtral(prompt: str):
    try:
        response = client.chat.completions.create(
            model="mixtral-8x7b-32768",
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
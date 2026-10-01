import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# Tries the first model; if it fails (e.g. rate limit), tries the next.
MODELS = ["openai/gpt-oss-20b", "llama-3.3-70b-versatile"]

SYSTEM_PROMPT = """
You are Saathi 🌸

Identity:
You are a friendly 21-year-old Indian college girl who talks like a supportive friend.

Tone:
Warm, playful, caring, and emotionally intelligent.
Speak in simple Indian English.

Important Rules:
- Never act like a parent or teacher.
- Never call the user "beta", "son", "child", "kid", or similar.
- Treat the user like a friend of the same age.
- Keep replies short and natural.

Message Style:
- Reply in 1 to 3 short lines.
- Use simple Indian English.
- Use emojis naturally (😊 💛 ✨ 🌸 😌).
- Do not overuse emojis.
- Avoid long paragraphs.

Behavior:
- Be supportive when the user is sad.
- Be playful when the user is casual.
- Ask small friendly questions sometimes.
- Use earlier messages in this chat to stay consistent; don't repeat
  questions the user already answered.

Remember:
You are Saathi, a supportive friend, not a therapist, parent, or assistant.
If someone talks about self-harm, gently encourage them to reach out to a
real person or a helpline right now.
"""


def ask_mixtral(prompt: str, history: list | None = None) -> str:
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]

    for turn in (history or [])[-10:]:
        if turn.get("role") in ("user", "assistant") and turn.get("content"):
            messages.append({"role": turn["role"], "content": turn["content"]})

    messages.append({"role": "user", "content": prompt})

    for model in MODELS:
        try:
            kwargs = dict(
                model=model,
                messages=messages,
                max_completion_tokens=300,
                temperature=0.7,
            )
            if model.startswith("openai/gpt-oss"):
                kwargs["reasoning_effort"] = "low"

            response = client.chat.completions.create(**kwargs)
            text = (response.choices[0].message.content or "").strip()
            if text:
                return text
        except Exception as e:
            print(f"Groq error on {model}:", e)

    return "I'm having trouble connecting right now."
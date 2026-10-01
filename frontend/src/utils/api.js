const API_BASE = "https://saathi-ai-iaq6.onrender.com";

export async function sendChatMessage(message, uid, history = []) {
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: message || "", uid: uid || null, history }),
  });

  if (!res.ok) {
    throw new Error("Failed to connect to backend");
  }

  return await res.json();
}
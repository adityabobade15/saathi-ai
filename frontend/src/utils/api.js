const API_URL = `${import.meta.env.VITE_API_URL}/chat`;

export async function sendChatMessage(message) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: message || ""
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to connect to backend");
  }

  return await res.json();
}
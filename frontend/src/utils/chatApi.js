export async function sendMessage(message) {
  const response = await fetch("http://127.0.0.1:8000/api/chat/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error("Backend error");
  }

  return response.json();
}

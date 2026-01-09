import { useState } from "react";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div style={container}>
      <input
        style={input}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="How are you feeling today?"
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button style={button} onClick={handleSend}>
        Send
      </button>
    </div>
  );
}

const container = {
  display: "flex",
  gap: "10px",
  padding: "12px",
  borderTop: "1px solid #e5e7eb",
};

const input = {
  flex: 1,
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  outline: "none",
};

const button = {
  padding: "10px 16px",
  borderRadius: "8px",
  border: "none",
  background: "#4f46e5",
  color: "white",
  cursor: "pointer",
};

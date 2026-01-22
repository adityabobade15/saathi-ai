import { useState } from "react";

export default function MessageInput({ onSend }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input); // ✅ correct prop
    setInput("");
  };

  return (
    <div style={container}>
      <input
        style={inputStyle}
        type="text"
        placeholder="Type how you're feeling..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button style={btn} onClick={handleSend}>
        Send
      </button>
    </div>
  );
}

/* ---- styles ---- */
const container = {
  display: "flex",
  gap: "10px",
  padding: "12px 20px",
  background: "#000",
};

const inputStyle = {
  flex: 1,
  padding: "14px",
  borderRadius: "14px",
  border: "1px solid #222",
  background: "#111",
  color: "white",
  outline: "none",
};

const btn = {
  padding: "12px 20px",
  borderRadius: "14px",
  border: "none",
  background: "#6c5ce7",
  color: "white",
  cursor: "pointer",
};

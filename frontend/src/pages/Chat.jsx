import { useState } from "react";
import Header from "../components/Header";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";
import Typing from "../components/Typing";
import CrisisModal from "../components/CrisisModal";
import BreathingModal from "../components/BreathingModal";
import GroundingModal from "../components/GroundingModal";
import { saveMoodFromChat } from "../utils/moodSync";

const API_BASE_URL = "http://127.0.0.1:8000";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hey… I’m here with you 💗 How are you feeling right now?",
    },
  ]);

  const [typing, setTyping] = useState(false);
  const [showCrisis, setShowCrisis] = useState(false);
  const [showBreathing, setShowBreathing] = useState(false);
  const [showGrounding, setShowGrounding] = useState(false);
  const [lastEmotion, setLastEmotion] = useState("neutral");

  const sendMessage = async (text) => {
    setMessages((prev) => [...prev, { sender: "user", text }]);
    saveMoodFromChat(text);
    setTyping(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/chat/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      setTyping(false);

      const emotion = data?.emotion?.label || "neutral";
      setLastEmotion(emotion);

      if (data.crisis) setShowCrisis(true);
      if (emotion === "fear" || emotion === "anxiety")
        setTimeout(() => setShowBreathing(true), 700);

      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch (err) {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Unable to connect to server." },
      ]);
      console.error(err);
    }
  };

  return (
    <div style={page}>
      <Header />

      <div style={chatBox}>
        {messages.map((m, i) => (
          <Message key={i} sender={m.sender} text={m.text} />
        ))}
        {typing && <Typing />}
      </div>

      <div style={actions}>
        <button style={btn} onClick={() => setShowBreathing(true)}>
          🌬 Breathe
        </button>
        <button style={btn} onClick={() => setShowGrounding(true)}>
          🌱 Ground
        </button>
      </div>

      <MessageInput onSend={sendMessage} />

      <CrisisModal open={showCrisis} onClose={() => setShowCrisis(false)} />
      <BreathingModal
        open={showBreathing}
        onClose={() => setShowBreathing(false)}
        emotion={lastEmotion}
      />
      <GroundingModal
        open={showGrounding}
        onClose={() => setShowGrounding(false)}
      />
    </div>
  );
}

/* ---- styles ---- */
const page = {
  minHeight: "100vh",
  background: "#000",
  display: "flex",
  flexDirection: "column",
};

const chatBox = {
  flex: 1,
  padding: "20px",
  overflowY: "auto",
};

const actions = {
  display: "flex",
  gap: "10px",
  padding: "10px 20px",
};

const btn = {
  background: "#111",
  color: "white",
  border: "1px solid #222",
  borderRadius: "10px",
  padding: "8px 14px",
  cursor: "pointer",
};

import { useState, useEffect } from "react";
import Header from "../components/Header";

export default function Dashboard({ onBack }) {
  const [history, setHistory] = useState([]);

  // 🔹 Load & normalize data from localStorage (chat + dashboard)
  useEffect(() => {
    const saved = localStorage.getItem("moodHistory");
    if (!saved) return;

    const parsed = JSON.parse(saved);

    const normalized = parsed.map((m) => ({
      label: m.label || m.mood,
      emoji: m.emoji,
      date: m.date || m.time,
    }));

    setHistory(normalized);
  }, []);

  const moods = [
    { label: "Happy", emoji: "😊" },
    { label: "Okay", emoji: "🙂" },
    { label: "Neutral", emoji: "😐" },
    { label: "Anxious", emoji: "😟" },
    { label: "Low", emoji: "😔" },
  ];

  // 🔹 Manual mood add (keeps same format as chat)
  const addMood = (m) => {
    const updated = [
      {
        label: m.label,
        emoji: m.emoji,
        date: new Date().toLocaleString(),
      },
      ...history,
    ];

    setHistory(updated);
    localStorage.setItem("moodHistory", JSON.stringify(updated));
  };

  return (
    <div style={page}>
      <Header />

      <div style={container}>
        {/* Mood Buttons */}
        <div style={card}>
          <h3>📊 How are you feeling today?</h3>

          <div style={row}>
            {moods.map((m) => (
              <button
                key={m.label}
                style={moodBtn}
                onClick={() => addMood(m)}
              >
                <div style={{ fontSize: 22 }}>{m.emoji}</div>
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mood History */}
        <div style={card}>
          <h3>🕒 Mood History</h3>

          {history.length === 0 && (
            <p style={{ color: "#aaa" }}>No moods logged yet.</p>
          )}

          {history.map((h, i) => (
            <div key={i} style={historyRow}>
              <span>{h.emoji}</span>
              <span>{h.label}</span>
              <span style={time}>{h.date}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: 20 }}>
        <button style={backBtn} onClick={onBack}>
          ⬅ Back to Chat
        </button>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const page = {
  minHeight: "100vh",
  background: "#0b0f14",
  color: "white",
};

const container = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
  padding: "20px",
};

const card = {
  background: "#111",
  borderRadius: "14px",
  padding: "20px",
  border: "1px solid #222",
};

const row = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
};

const moodBtn = {
  background: "#1a1f26",
  color: "white",
  border: "1px solid #333",
  borderRadius: "12px",
  padding: "12px",
  cursor: "pointer",
  width: "110px",
};

const historyRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 0",
  borderBottom: "1px solid #222",
};

const time = {
  fontSize: 12,
  color: "#777",
};

const backBtn = {
  background: "#1a1f26",
  color: "white",
  border: "1px solid #333",
  borderRadius: "10px",
  padding: "10px 14px",
  cursor: "pointer",
};

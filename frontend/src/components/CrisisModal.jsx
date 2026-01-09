import { useEffect, useState } from "react";

export default function CrisisModal({ open, onClose }) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (!open) return;

    setCount(3);
    const timer = setInterval(() => {
      setCount((c) => c - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [open]);

  if (!open) return null;

  return (
    <div style={overlay}>
      <div style={card}>
        <h2 style={{ marginBottom: 10 }}>💔 I’m really glad you told me</h2>

        <p style={text}>
          You’re not alone. What you’re feeling is serious — and help is
          available right now.
        </p>

        {count > 0 ? (
          <p style={countText}>
            Take a breath with me… {count}
          </p>
        ) : (
          <>
            <div style={actions}>
              <a href="tel:112" style={btnRed}>
                📞 Call Emergency (112)
              </a>

              <a
                href="https://www.google.com/maps/search/nearby+hospital"
                target="_blank"
                rel="noreferrer"
                style={btn}
              >
                🏥 Find Nearby Hospital
              </a>

              <button style={btn} onClick={onClose}>
                💬 Continue Chat
              </button>
            </div>

            <p style={small}>
              If you’re in India:  
              Kiran Helpline: <b>1800-599-0019</b>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.75)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const card = {
  background: "#111",
  color: "white",
  borderRadius: "16px",
  padding: "24px",
  maxWidth: "420px",
  textAlign: "center",
  border: "1px solid #333",
};

const text = {
  color: "#ddd",
  marginBottom: 20,
};

const countText = {
  fontSize: 24,
  margin: "20px 0",
};

const actions = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const btn = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #333",
  background: "#1a1f26",
  color: "white",
  textDecoration: "none",
  cursor: "pointer",
};

const btnRed = {
  ...btn,
  background: "#7f1d1d",
  border: "1px solid #991b1b",
};

const small = {
  marginTop: 16,
  fontSize: 12,
  color: "#aaa",
};

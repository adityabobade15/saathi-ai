export default function GroundingModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div style={overlay}>
      <div style={modal}>
        <h2>🌱 Grounding Exercise</h2>

        <p style={text}>
          Let’s gently bring your attention to the present moment 🤍
        </p>

        <ul style={list}>
          <li>👀 Name <b>5</b> things you can see</li>
          <li>✋ Name <b>4</b> things you can feel</li>
          <li>👂 Name <b>3</b> things you can hear</li>
          <li>👃 Name <b>2</b> things you can smell</li>
          <li>👅 Name <b>1</b> thing you can taste</li>
        </ul>

        <p style={hint}>
          Take your time. I’m right here with you 💗
        </p>

        <button style={button} onClick={onClose}>
          I feel more present
        </button>
      </div>
    </div>
  );
}

/* styles */
const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.65)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const modal = {
  width: "440px",
  background: "#0b0b0f",
  color: "white",
  padding: "28px",
  borderRadius: "18px",
};

const text = {
  marginTop: "10px",
  opacity: 0.9,
};

const list = {
  marginTop: "18px",
  lineHeight: 1.8,
  paddingLeft: "18px",
};

const hint = {
  marginTop: "14px",
  fontSize: "14px",
  opacity: 0.7,
};

const button = {
  marginTop: "22px",
  width: "100%",
  padding: "12px",
  background: "#6d5dfc",
  border: "none",
  borderRadius: "12px",
  color: "white",
  cursor: "pointer",
  fontSize: "16px",
};

import "../styles/Ground.css";

export default function Ground({ onClose }) {
  return (
    <div className="ground-card">
      <div className="ground-title">
        🌱 Grounding Exercise
      </div>

      <div className="ground-steps">
        <p>👀 <strong>5</strong> things you can see</p>
        <p>✋ <strong>4</strong> things you can feel</p>
        <p>👂 <strong>3</strong> things you can hear</p>
        <p>👃 <strong>2</strong> things you can smell</p>
        <p>👅 <strong>1</strong> thing you can taste</p>
      </div>

      <button className="ground-done" onClick={onClose}>
        Done
      </button>
    </div>
  );
}

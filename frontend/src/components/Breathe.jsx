import "../styles/Breathe.css";

export default function Breathe({ onClose }) {
  return (
    <div className="breathe-root">
      <div className="breathe-card">
        <div className="breathe-circle" />

        <p className="breathe-instruction">
          Inhale • Hold • Exhale
        </p>

        <button className="breathe-done" onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  );
}

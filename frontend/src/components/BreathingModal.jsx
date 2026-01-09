import { useEffect, useRef, useState } from "react";

export default function BreathingModal({ open, onClose }) {
  const phases = [
    { name: "Inhale", duration: 4000, scale: 1.25 },
    { name: "Hold", duration: 4000, scale: 1.25 },
    { name: "Exhale", duration: 6000, scale: 0.7 },
  ];

  const [started, setStarted] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);

  const circleRef = useRef(null);
  const timeoutRef = useRef(null);

  // Reset when modal opens
  useEffect(() => {
    if (open) {
      setStarted(false);
      setPhaseIndex(0);
      clearTimeout(timeoutRef.current);

      if (circleRef.current) {
        circleRef.current.style.transition = "none";
        circleRef.current.style.transform = "scale(0.7)";
      }
    }
  }, [open]);

  // Phase engine (ONE timer only)
  useEffect(() => {
    if (!started) return;

    const phase = phases[phaseIndex];
    const circle = circleRef.current;
    if (!circle) return;

    // Force reflow so animation ALWAYS triggers
    circle.style.transition = "none";
    circle.style.transform = circle.style.transform;
    circle.offsetHeight; // 👈 force browser reflow

    circle.style.transition = `transform ${phase.duration}ms linear`;
    circle.style.transform = `scale(${phase.scale})`;

    timeoutRef.current = setTimeout(() => {
      setPhaseIndex((i) => (i + 1) % phases.length);
    }, phase.duration);

    return () => clearTimeout(timeoutRef.current);
  }, [started, phaseIndex]);

  if (!open) return null;

  return (
    <div style={overlay}>
      <div style={modal}>
        <h2>Breathing Exercise</h2>

        {!started ? (
          <>
            <p>Click start when ready 🌿</p>
            <button style={startBtn} onClick={() => setStarted(true)}>
              Start
            </button>
          </>
        ) : (
          <>
            <div style={circleWrap}>
              <div ref={circleRef} style={circle} />
            </div>
            <h3>{phases[phaseIndex].name}</h3>
          </>
        )}

        <button style={closeBtn} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

/* STYLES */
const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.7)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const modal = {
  background: "#020617",
  color: "white",
  padding: "28px",
  borderRadius: "18px",
  width: "280px",
  textAlign: "center",
};

const circleWrap = {
  display: "flex",
  justifyContent: "center",
  margin: "20px 0",
};

const circle = {
  width: "140px",
  height: "140px",
  borderRadius: "50%",
  background: "linear-gradient(135deg,#60a5fa,#4f46e5)",
  transform: "scale(0.7)",
};

const startBtn = {
  marginTop: "16px",
  padding: "10px 18px",
  borderRadius: "12px",
  border: "none",
  background: "#4f46e5",
  color: "white",
  cursor: "pointer",
};

const closeBtn = {
  marginTop: "18px",
  padding: "8px 14px",
  borderRadius: "10px",
  background: "#111",
  border: "1px solid #222",
  color: "white",
  cursor: "pointer",
};

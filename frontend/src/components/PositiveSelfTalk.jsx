import { useState, useEffect } from "react";
import { MessageCircleHeart, Brain, Sparkles } from "lucide-react";
import "../styles/PositiveSelfTalk.css";

export default function PositiveSelfTalk({ onClose }) {
  const [mode, setMode] = useState(null);
  const [step, setStep] = useState(0);

  const scripts = {
    anxiety: [
      "Take a slow breath.",
      "Your body is reacting, but you are safe.",
      "This feeling will pass.",
      "Focus only on this moment.",
      "You are stronger than this wave."
    ],
    overthinking: [
      "Pause.",
      "Not every thought needs attention.",
      "Let the thought come.",
      "Let it go.",
      "You don’t need to control everything."
    ],
    doubt: [
      "You are allowed to grow.",
      "Mistakes do not define you.",
      "Progress matters more than perfection.",
      "You are learning.",
      "You are enough."
    ]
  };

  useEffect(() => {
    if (!mode) return;

    const interval = setInterval(() => {
      setStep((prev) =>
        prev < scripts[mode].length - 1 ? prev + 1 : prev
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [mode]);

  return (
    <div className="selftalk-overlay">
      <div className={`selftalk-card ${mode ? mode : ""}`}>
        {!mode ? (
          <>
            <h2>Positive Self-Talk</h2>

            <div className="selftalk-options">

              <div
                className="option anxiety"
                onClick={() => { setMode("anxiety"); setStep(0); }}
              >
                <MessageCircleHeart size={24} />
                <span>For Anxiety</span>
              </div>

              <div
                className="option overthinking"
                onClick={() => { setMode("overthinking"); setStep(0); }}
              >
                <Brain size={24} />
                <span>For Overthinking</span>
              </div>

              <div
                className="option doubt"
                onClick={() => { setMode("doubt"); setStep(0); }}
              >
                <Sparkles size={24} />
                <span>For Self-Doubt</span>
              </div>

              <button className="close-inline" onClick={onClose}>
                Close
              </button>

            </div>
          </>
        ) : (
          <>
            <h2>
              {mode === "anxiety" && "For Anxiety"}
              {mode === "overthinking" && "For Overthinking"}
              {mode === "doubt" && "For Self-Doubt"}
            </h2>

            <p className="selftalk-text">
              {scripts[mode][step]}
            </p>

            <div className="selftalk-bottom">
              <button
                className="back-btn"
                onClick={() => {
                  setMode(null);
                  setStep(0);
                }}
              >
                ← Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
import { useRef, useState } from "react";
import "../styles/CalmSound.css";

const SOUNDS = [
  { id: "rain", label: "🌧 Rain", file: "/sounds/rain.mp3" },
  { id: "ocean", label: "🌊 Ocean", file: "/sounds/ocean.mp3" },
  { id: "forest", label: "🌲 Forest", file: "/sounds/forest.mp3" },
];

export default function CalmSound({ onClose }) {
  const audioRef = useRef(null);
  const [current, setCurrent] = useState(null);
  const [playing, setPlaying] = useState(false);

  const playSound = (sound) => {
    if (!audioRef.current) return;

    if (current !== sound.id) {
      audioRef.current.src = sound.file;
    }

    audioRef.current.play();
    setCurrent(sound.id);
    setPlaying(true);
  };

  const togglePause = () => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    setPlaying(false);
  };

  const close = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPlaying(false);
    setCurrent(null);
    onClose();
  };

  return (
    <div className="calm-card">
      <h2>🎧 Calm Sounds</h2>
      <p>Choose a sound and relax for a moment.</p>

      <audio ref={audioRef} loop />

      <div className="sound-list">
        {SOUNDS.map((s) => (
          <button
            key={s.id}
            className={`sound-btn ${current === s.id ? "active" : ""}`}
            onClick={() => playSound(s)}
          >
            {s.label}
          </button>
        ))}
      </div>

      {playing && (
        <button className="pause-btn" onClick={togglePause}>
          ⏸ Pause
        </button>
      )}

      <button className="calm-close-btn" onClick={onClose}>
       ✕
     </button>
    </div>
  );
}

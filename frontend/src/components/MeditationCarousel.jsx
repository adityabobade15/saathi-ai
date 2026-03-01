import { useState, useRef } from "react";
import "../styles/MeditationCarousel.css";

import mindfulnessImg from "../assets/meditation/mindfulness.png";
import relaxingImg from "../assets/meditation/relaxing-outdoors.png";
import stabilityImg from "../assets/meditation/stability-ball.png";

export default function MeditationCarousel({ onClose }) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const slides = [
  {
    image: mindfulnessImg,
    title: "Deep Focus Reset",
    desc: "Close your eyes gently. Take a slow breath in through your nose. Let your attention return to this moment. If your mind wanders, softly guide it back without judgment."
  },
  {
    image: relaxingImg,
    title: "Mental Calmness",
    desc: "Allow your breathing to slow naturally. Feel your shoulders relax. Notice any tension and let it dissolve with each exhale. You are safe in this moment."
  },
  {
    image: stabilityImg,
    title: "Confidence Boost",
    desc: "Bring awareness to your strengths. Remember a moment you felt proud. Feel that strength within you now. You are capable, growing, and enough."
  }
];

  // Swipe Handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;

    if (distance > 50 && current < slides.length - 1) {
      setCurrent(current + 1);
    }

    if (distance < -50 && current > 0) {
      setCurrent(current - 1);
    }
  };

  return (
    <div className="meditation-overlay">
      <div
        className="meditation-card"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={slides[current].image}
          alt={slides[current].title}
          className="meditation-image"
        />

        <h2>{slides[current].title}</h2>
        <p>{slides[current].desc}</p>

        <div className="dots">
          {slides.map((_, index) => (
            <span
              key={index}
              className={current === index ? "active" : ""}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>

        <button className="done-btn" onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  );
}
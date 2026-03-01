import "../styles/Dashboard.css";

export default function Dashboard({ emotions, onClose }) {
  return (
    <div className="ground-card dashboard-card" onClick={(e) => e.stopPropagation()}>
      <h3 className="ground-title">🌱 Mood Reflection</h3>
      <p className="ground-subtitle">
        A gentle record of how you’ve been feeling
      </p>

      {/* SCROLLABLE CONTENT */}
      <div className="dashboard-scroll">
        {emotions.length === 0 ? (
          <div className="emotion-empty">
            No moods logged yet 🌸
          </div>
        ) : (
          emotions
            .slice()
            .reverse()
            .map((e, i) => (
              <div key={i} className="emotion-row">
                <div className="emotion-left">
                  <span className="emotion-emoji">{e.emoji}</span>
                  <span className="emotion-label">{e.label}</span>
                </div>
                <small className="emotion-time">{e.time}</small>
              </div>
            ))
        )}
      </div>

      <button className="ground-close" onClick={onClose}>
        Close
      </button>
    </div>
  );
}

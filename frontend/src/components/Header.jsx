export default function Header({ user = "Guest", onBack, onLogout }) {
  return (
    <header className="app-header">
      <div className="brand">
        <span className="logo">🧠</span>
        <div>
          <div className="brand-title">Mental Health Companion</div>
          <div className="brand-sub">Good {greeting()}, {user}</div>
        </div>
      </div>

      <div className="header-actions">
        {onBack && <button className="calm-btn small" onClick={onBack}>Back</button>}
        {onLogout && <button className="calm-btn small" onClick={onLogout}>Logout</button>}
      </div>
    </header>
  );
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "morning";
  if (h < 18) return "afternoon";
  return "evening";
}

export default function MoodBar({ label, value }) {
  return (
    <div style={wrap}>
      <div style={row}>
        <span>{label}</span>
        <span>{value}%</span>
      </div>

      <div style={barBg}>
        <div style={{ ...barFill, width: `${value}%` }} />
      </div>
    </div>
  );
}

const wrap = {
  marginBottom: "14px",
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "14px",
  marginBottom: "6px",
};

const barBg = {
  height: "8px",
  background: "#222",
  borderRadius: "6px",
};

const barFill = {
  height: "8px",
  background: "linear-gradient(90deg, #6c63ff, #ff6bdc)",
  borderRadius: "6px",
  transition: "width 0.5s ease",
};

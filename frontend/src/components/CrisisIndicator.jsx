export default function CrisisIndicator({ active }) {
  if (!active) return null;

  return (
    <div style={alert}>
      🔴 Crisis detected — please seek immediate support
    </div>
  );
}

const alert = {
  background: "rgba(255,0,0,0.15)",
  border: "1px solid red",
  color: "#ffb3b3",
  padding: "12px",
  margin: "10px 20px",
  borderRadius: "12px",
  textAlign: "center",
  boxShadow: "0 0 25px rgba(255,0,0,0.6)",
};

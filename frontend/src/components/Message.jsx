export default function Message({ text, sender }) {
  const isUser = sender === "user";

  return (
    <div style={{ ...bubbleStyle, ...(isUser ? userStyle : botStyle) }}>
      {text}
    </div>
  );
}

const bubbleStyle = {
  maxWidth: "70%",
  padding: "10px 14px",
  borderRadius: "12px",
  marginBottom: "8px",
  fontSize: "14px",
};

const userStyle = {
  alignSelf: "flex-end",
  background: "#4f46e5",
  color: "white",
};

const botStyle = {
  alignSelf: "flex-start",
  background: "#e5e7eb",
  color: "#111827",
};

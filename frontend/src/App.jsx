import { useState } from "react";
import Chat from "./pages/Chat";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [page, setPage] = useState("chat"); // "chat" | "dashboard"

  return (
    <>
      {page === "chat" && (
        <>
          <Chat />
          {/* FLOATING DASHBOARD BUTTON */}
          <button
            style={dashboardBtn}
            onClick={() => setPage("dashboard")}
          >
            📊 Dashboard
          </button>
        </>
      )}

      {page === "dashboard" && (
        <Dashboard onBack={() => setPage("chat")} />
      )}
    </>
  );
}

const dashboardBtn = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  background: "#6c63ff",
  color: "white",
  border: "none",
  borderRadius: "14px",
  padding: "14px 18px",
  cursor: "pointer",
  fontSize: "15px",
};

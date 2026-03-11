import { useState } from "react";
import Auth from "./pages/Auth";
import Chat from "./pages/Chat";
import Welcome from "./pages/Welcome";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  return isLoggedIn ? (
    <Chat
      userName={userName}
      onSignOut={() => {
        setIsLoggedIn(false);
        setUserName("");
      }}
    />
  ) : (
    <Auth
      onLoginSuccess={(name) => {
        setUserName(name);
        setIsLoggedIn(true);
      }}
    />
  );
}

export default App;

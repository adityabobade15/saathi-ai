import { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter email");
    // NOTE: this is a placeholder auth flow for local dev.
    onLogin(email);
  };

  return (
    <div className="calm-page center">
      <div className="calm-card login-card">
        <h1 className="title">🧠 Mental Health Companion</h1>
        <p className="subtitle">I’m here to listen — sign in to continue</p>

        <form onSubmit={submit} className="login-form">
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="calm-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="calm-input"
          />

          <button className="calm-btn" type="submit">Continue</button>
        </form>
      </div>
    </div>
  );
}

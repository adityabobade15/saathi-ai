import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "../styles/auth.css";

export default function Auth({ onLoginSuccess }) {

  const [mode, setMode] = useState("signup");
const [form, setForm] = useState({
  name: "",
  email: "",
  password: "",
});

// ✅ ADD THIS (MISSING)
function handleChange(e) {
  setForm({ ...form, [e.target.name]: e.target.value });
}

async function handleSubmit(e) {
  e.preventDefault();

  try {
    let userCredential;

    if (mode === "signup") {
      userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
    } else {
      userCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
    }

    const user = userCredential.user;

console.log("Firebase UID:", user.uid);

// 🔗 SYNC USER WITH BACKEND (FastAPI → Firestore)
await fetch("http://127.0.0.1:8000/api/users/create", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    uid: user.uid,
    email: user.email,
    name: form.name || "Friend",
  }),
});

// pass name to app
onLoginSuccess(form.name || "Friend");

  } catch (error) {
    alert(error.message);
    console.error("Auth error:", error);
  }
}

  return (
    <div className="auth-container">
      {/* LEFT */}
      <div className="auth-left">
        <div className="brand">
          <div className="logo">S</div>
          <span>Saathi</span>
        </div>

        <h1 className="auth-title"><strong>
          Help yourself,
          <br />
          your creativity
          <br />& your <span>mental health</span>.</strong>
        </h1>

        <p className="subtitle">
          {mode === "signup"
            ? "Create your Saathi account and begin your healing journey."
            : "Welcome back. Log in to continue."}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === "signup" && (
            <>
              <label>FULL NAME</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </>
          )}

          <label>EMAIL ADDRESS</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <label>PASSWORD</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />

          <button type="submit">
            {mode === "signup" ? "Sign Up" : "Log In"}
          </button>
        </form>

        <p className="switch">
          {mode === "signup" ? (
            <>
              Already have an account?{" "}
              <span onClick={() => setMode("login")}>Log In</span>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <span onClick={() => setMode("signup")}>Sign Up</span>
            </>
          )}
        </p>
      </div>

      {/* RIGHT */}
<div className="auth-right">
  <svg
    className="right-lines"
    viewBox="0 0 600 900"
    preserveAspectRatio="none"
  >
    <path d="M120 0 C300 300 80 600 260 900" />
    <path d="M240 0 C420 350 180 650 360 900" />
    <path d="M360 0 C180 400 460 700 300 900" />
    <path d="M480 0 C260 450 560 780 420 900" />
  </svg>

  <div className="heart-dot">❤️</div>

  <div className="right-text">
    <h2>Your safe space</h2>
    <p>
      Gentle support for your thoughts, emotions,
      and mental well-being.
    </p>
  </div>
</div>
    </div>
  );
}


import React, { useState } from "react";
import "./login.css";

function Login({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields ❌");
      return;
    }

    // SAVE LOGIN STATUS
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userEmail", email);

    alert(isSignup ? "Signup Successful 🎉" : "Login Successful ✅");
    onClose();
  };

  return (
    <div className="login-overlay">
      <div className="login-box">
        <span className="close-btn" onClick={onClose}>×</span>

        <h2>{isSignup ? "Sign Up" : "Login"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="switch-text">
          {isSignup ? "Already have an account?" : "New user?"}
          <span onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? " Login" : " Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;

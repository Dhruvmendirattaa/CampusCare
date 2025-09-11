import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please fill in both Username and Password");
      return;
    }

    setError("");
    console.log("Logging in with:", { username, password });
    // API call yahan karenge
  };

  return (
    <div className="login-container">
      {/* ---------- Left Section with Video ---------- */}
      <div className="login-left">
        <video autoPlay loop muted playsInline>
          <source src="/uploads/vdo2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="login-left-content">
        </div>
      </div>

      {/* ---------- Right Section with Form ---------- */}
      <div className="login-right">
        <h2>Hello! Welcome back!</h2>
        <p>Let’s Login to Your Account</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <span className="error-message">{error}</span>}
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="signup-text">
          Don’t have an account? <Link to="/signup">Sign up now</Link>
        </p>

        <div className="footer-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/cookies">Cookies Settings</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

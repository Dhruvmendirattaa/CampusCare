import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please fill in both Username and Password");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // Save token + user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setLoading(false);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* ---------- Left Section with Video ---------- */}
      <div className="login-left">
        <video autoPlay loop muted playsInline>
          <source src="/uploads/vdo2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
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
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
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

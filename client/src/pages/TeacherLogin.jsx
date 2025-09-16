import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TeacherLogin.css";

const TeacherLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy preset teacher credentials
    const teacherEmail = "teacher@campuscare.com";
    const teacherPassword = "teacher123";

    if (email === teacherEmail && password === teacherPassword) {
      localStorage.setItem("role", "teacher");
      navigate("/teacher-dashboard"); // Redirect to teacher dashboard
    } else {
      setError("Invalid credentials for teacher login!");
    }
  };

  return (
    <div className="teacher-login-container">
      <h2>Teacher Login</h2>
      <p>Login with your provided credentials</p>

      <form className="teacher-login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Teacher Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      <a className="teacher-login-link" onClick={() => navigate("/login")}>
        Back to Student Login
      </a>
    </div>
  );
};

export default TeacherLogin;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./TeacherLogin.css";

const TeacherLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🔹 Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 Handle login
  const handleSubmit = (e) => {
    e.preventDefault();

    const teacherEmail = "teacher@campuscare.com";
    const teacherPassword = "teacher123";

    if (formData.email === teacherEmail && formData.password === teacherPassword) {
      localStorage.setItem("role", "teacher");
      navigate("/teacher-dashboard");
    } else {
      setError("Invalid credentials for teacher login!");
    }
  };

  return (
    <div className="teacher-login-wrapper">
      {/* Left Section with Video */}
      <div className="teacher-login-left">
        <video src="/uploads/vdo2.mp4" autoPlay loop muted playsInline />
        <div className="teacher-login-overlay"></div>
        <h1 className="teacher-login-title">!</h1>
      </div>

      {/* Right Section */}
      <div className="teacher-login-right">
        <div className="teacher-login-container">
          <h2>Teacher Login</h2>
          <p>Login with your provided credentials</p>

          <form className="teacher-login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Enter Teacher Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit">Login</button>
            {error && <p className="error-text">{error}</p>}
          </form>

          {/* Links */}
          <p className="login-text">
            Not a teacher? <Link to="/login">Go to Student Login</Link>
          </p>

          <div className="footer-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/cookies">Cookies Settings</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherLogin;

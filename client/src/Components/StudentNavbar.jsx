import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // ✅ import context
import "./StudentNavbar.css";

const StudentNavbar = () => {
  const { logout } = useAuth(); // get logout from context
  const navigate = useNavigate();

  const [studentName, setStudentName] = useState("");
  const [initials, setInitials] = useState("");
  const [bgColor, setBgColor] = useState("");

  // 🔹 Get logged-in student from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.name) {
      setStudentName(storedUser.name);
    }
  }, []);

  // 🔹 Generate initials + random bg color
  useEffect(() => {
    if (studentName) {
      const words = studentName.trim().split(" ");
      const init =
        words.length > 1
          ? words[0][0].toUpperCase() + words[1][0].toUpperCase()
          : words[0][0].toUpperCase();
      setInitials(init);

      const colors = ["#6366f1", "#f97316", "#10b981", "#ef4444", "#8b5cf6"];
      setBgColor(colors[Math.floor(Math.random() * colors.length)]);
    }
  }, [studentName]);

  // 🔹 Logout function using context
  const handleLogout = () => {
    logout(); // clears user and role from context + localStorage
    navigate("/login"); // redirect to login page
  };

  return (
    <nav className="navbar">
      {/* Left Logo */}
      <div className="logo">
        <img src="/uploads/logo.png" alt="CampusCare Logo" className="logo-img" />
        <p>CampusCare</p>
      </div>

      {/* Middle Links */}
      <ul>
        <li>
          <NavLink to="/" className="nav-link" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard" className="nav-link" end>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/counsellor-sessions" className="nav-link">
            Counsellor Sessions
          </NavLink>
        </li>
        <li>
          <NavLink to="/group-chat" className="nav-link">
            Peer Support
          </NavLink>
        </li>
        <li>
          <NavLink to="/resource-hub" className="nav-link">
            Resource Hub
          </NavLink>
        </li>
      </ul>

      {/* Right Side Profile + Logout */}
      <div className="nav-right">
        <div className="profile-container">
          <div className="profile-icon" style={{ backgroundColor: bgColor }}>
            {initials}
          </div>
          <span className="profile-name">{studentName}</span>
        </div>

        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default StudentNavbar;

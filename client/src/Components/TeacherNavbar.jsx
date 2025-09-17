import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./TeacherNavbar.css";

const TeacherNavbar = () => {
  const [teacherName, setTeacherName] = useState("Sania Gadi"); // yaha tum backend se bhi fetch kar sakti ho
  const [initials, setInitials] = useState("");
  const [bgColor, setBgColor] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("role");
  };

  useEffect(() => {
    if (teacherName) {
      const words = teacherName.trim().split(" ");
      const init =
        words.length > 1
          ? words[0][0].toUpperCase() + words[1][0].toUpperCase()
          : words[0][0].toUpperCase();
      setInitials(init);

      // random color generator
      const colors = ["#6366f1", "#f97316", "#10b981", "#ef4444", "#8b5cf6"];
      const random = colors[Math.floor(Math.random() * colors.length)];
      setBgColor(random);
    }
  }, [teacherName]);

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
          <NavLink to="/teacher-home" className="nav-link" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/counsellor-sessions" className="nav-link">
            Counsellor Sessions
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard" className="nav-link">
            Dashboard
          </NavLink>
        </li>
      </ul>

      {/* Right Side Profile + Logout */}
      <div className="nav-right">
        <div className="profile-container">
          <div
            className="profile-icon"
            style={{ backgroundColor: bgColor }}
          >
            {initials}
          </div>
          <span className="profile-name">{teacherName}</span>
        </div>

        <NavLink to="/login">
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </NavLink>
      </div>
    </nav>
  );
};

export default TeacherNavbar;

import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // ✅ import context
import "./TeacherNavbar.css";

const TeacherNavbar = () => {
  const { logout } = useAuth(); // get logout function from context
  const navigate = useNavigate();

  const [teacherName, setTeacherName] = useState("Sania Gadi"); // default name
  const [initials, setInitials] = useState("");
  const [bgColor, setBgColor] = useState("");

  // 🔹 Handle logout using context
  const handleLogout = () => {
    logout(); // clears user and role from context + localStorage
    navigate("/login"); // redirect to login
  };

  // 🔹 Generate initials + random background color
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const name = storedUser?.name || teacherName;
    setTeacherName(name);

    if (name) {
      const words = name.trim().split(" ");
      const init =
        words.length > 1
          ? words[0][0].toUpperCase() + words[1][0].toUpperCase()
          : words[0][0].toUpperCase();
      setInitials(init);

      const colors = ["#6366f1", "#f97316", "#10b981", "#ef4444", "#8b5cf6"];
      const random = colors[Math.floor(Math.random() * colors.length)];
      setBgColor(random);
    }
  }, []);

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
          <NavLink to="/teacherdashboard" className="nav-link">
            Dashboard
          </NavLink>
        </li>
      </ul>

      {/* Right Side Profile + Logout */}
      <div className="nav-right">
        <div className="profile-container">
          <div className="profile-icon" style={{ backgroundColor: bgColor }}>
            {initials}
          </div>
          <span className="profile-name">{teacherName}</span>
        </div>

        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default TeacherNavbar;

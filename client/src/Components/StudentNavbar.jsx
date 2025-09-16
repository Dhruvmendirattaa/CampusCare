import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./StudentNavbar.css";

const StudentNavbar = () => {
  const [studentName, setStudentName] = useState("");
  const [initials, setInitials] = useState("");
  const [bgColor, setBgColor] = useState("");
  const navigate = useNavigate();

  // 🔹 Get logged-in student from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.username) {
      setStudentName(storedUser.username);
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

  // 🔹 Logout function
  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login"); // back to login page
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
          <NavLink to="/student-dashboard" className="nav-link" end>
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

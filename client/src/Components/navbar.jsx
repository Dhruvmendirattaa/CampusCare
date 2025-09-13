import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img
          src="/uploads/logo.png"  // Public folder ka relative path
          alt="CampusCare Logo"
          className="logo-img"
        />
        <p>CampusCare</p>
      </div>

      <ul>
        <li>
          <NavLink to="/" className="nav-link" end>
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
        <li>
          <NavLink to="/solutions" className="nav-link">
            Solutions
          </NavLink>
        </li>
        <li>
          <NavLink to="/chatbot" className="nav-link">
            Chatbot
          </NavLink>
        </li>
      </ul>

      <div className="nav-buttons">
        <NavLink to="/login">
          <button className="login">Login</button>
        </NavLink>
        <NavLink to="/signup">
          <button className="signup">Signup</button>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;

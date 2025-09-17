import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img
          src="/uploads/logo.png"  
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

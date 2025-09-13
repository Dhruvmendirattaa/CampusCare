import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <p>© CampusCare — Supporting student wellbeing with trusted tools.</p>
      <p>
        If in crisis call: <span className="crisis">+1 800 123 456</span>
      </p>

      <div className="footbtns">
        <button>About</button>
        <button>Privacy Policy</button>
        <button>Help</button>
      </div>
    </footer>
  );
};

export default Footer;

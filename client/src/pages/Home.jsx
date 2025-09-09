import React from "react";
/*import HeroSection from "../components/HeroSection";
import Resources from "../components/Resources";
import BookingSection from "../components/BookingSection";
import Chatbot from "../components/Chatbot";*/

import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to CampusCare</h1>
        <p>Your trusted companion for student wellness, learning, and growth.</p>
        <button className="hero-btn">Get Started</button>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Our Features</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Counsellor Sessions</h3>
            <p>Book appointments with certified counsellors anytime.</p>
          </div>
          <div className="feature-card">
            <h3>Student Dashboard</h3>
            <p>Track your progress and manage activities in one place.</p>
          </div>
          <div className="feature-card">
            <h3>AI Chatbot</h3>
            <p>Instant answers to your doubts, available 24/7.</p>
          </div>
          <div className="feature-card">
            <h3>Resources</h3>
            <p>Access guides, study material, and self-help resources.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="about-text">
          <h2>About CampusCare</h2>
          <p>
            CampusCare is designed to support students by offering counselling,
            study resources, and interactive tools. Our mission is to ensure
            students succeed academically and emotionally.
          </p>
        </div>
        <div className="about-img">
          
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h2>Ready to start your journey?</h2>
        <button className="signup-btn">Join Now</button>
      </section>
    </div>
  );
};

export default Home;

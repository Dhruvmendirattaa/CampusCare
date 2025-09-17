import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./TeacherHome.css"; // reuse Home.css

const Feature = ({ title, text, icon }) => (
  <div className="feature-card" role="article" aria-label={title}>
    <div className="feature-icon" aria-hidden="true">{icon}</div>
    <div className="feature-text">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  </div>
);

const TeacherHome = () => {
  const navigate = useNavigate();

  return (
    <main className="home-container">
      {/* HERO Section */}
      <section className="hero" aria-labelledby="hero-title">
        <video className="hero-video" autoPlay muted loop playsInline>
          <source src="/uploads/vdo2.mp4" type="video/mp4" />
        </video>
        <div className="overlay"></div>

        <div className="hero-inner fade-up">
          <h1 id="hero-title">CampusCare — Teacher Dashboard</h1>
          <p>
            Empowering <span className="highlight">teachers</span> with AI tools, 
            student insights, and resources for better <span className="highlight">wellbeing</span>.
          </p>
          <div className="hero-actions">
            <Link to="/counsellor-sessions">
              <button className="hero-btn primary glow">📅 View Sessions</button>
            </Link>
            <Link to="/dashboard">
              <button className="hero-btn ghost glow">📊 Open Dashboard</button>
            </Link>
          </div>
        </div>

        {/* floating blobs */}
        <div className="blob b1"></div>
        <div className="blob b2"></div>
        <div className="blob b3"></div>
      </section>

      {/* FEATURES */}
      <section className="features" aria-labelledby="features-title">
        <h2 id="features-title" className="fade-in">✨ Teacher Tools</h2>
        <div className="feature-grid">
          <Feature
            title="Student Analytics"
            text="AI-powered insights to track class mood and academic stress levels."
            icon={<i className="fas fa-chart-line"></i>}
          />
          <Feature
            title="Session Management"
            text="Easily schedule, manage, and review counselling appointments."
            icon={<i className="fas fa-calendar-check"></i>}
          />
          <Feature
            title="Resources Hub"
            text="Access teaching aids, wellbeing material, and coping strategies."
            icon={<i className="fas fa-book"></i>}
          />
          <Feature
            title="24/7 AI Support"
            text="Quick guidance and recommendations for supporting your students."
            icon={<i className="fas fa-robot"></i>}
          />
        </div>
      </section>

      {/* STUDENT WELLBEING */}
      <section className="wellbeing" aria-labelledby="wellbeing-title">
        <h2 id="wellbeing-title">💡 Class Wellbeing Snapshot</h2>
        <p>Monitor student trends, challenges, and strengths in real-time.</p>
        <div className="snapshot-card pulse">
          <div className="stat">😊 68% Students Feeling Positive</div>
          <div className="stat">😟 22% Report Exam Stress</div>
          <div className="stat">📅 10 Sessions Scheduled This Week</div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about slide-in" aria-labelledby="about-title">
        <div className="about-card">
          <h2 id="about-title">🌟 About Teacher Portal</h2>
          <p>
            The Teacher Portal is designed to give <span className="highlight">educators</span> 
            the tools they need to track, guide, and support students effectively. 
            AI helps you recognize wellbeing patterns early and take meaningful action.
          </p>
          <ul className="about-list">
            <li>📊 Real-time Insights</li>
            <li>🔒 Secure & Confidential</li>
            <li>🤝 Collaborative Support</li>
          </ul>
        </div>
        <div className="about-visual">
          <div className="visual-illustration pulse">👩‍🏫 + 🤖</div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta" aria-labelledby="cta-title">
        <h2 id="cta-title" className="fade-up">🚀 Ready to Support Your Students Better?</h2>
        <p>Use CampusCare to balance academics with wellbeing and foster growth.</p>
        <div className="cta-actions">
          <button className="signup-btn glow" onClick={() => navigate("/dashboard")}>
            Open Dashboard
          </button>
          <button className="secondary" onClick={() => navigate("/counsellor-sessions")}>
            Manage Sessions
          </button>
        </div>
      </section>

      {/* Floating Appointment Button */}
      <button
        className="fab-btn appointment-btn"
        aria-label="Book Appointment"
        onClick={() => navigate("/counsellor-sessions")}
      >
        <i className="fas fa-calendar-alt"></i>
        <span className="tooltip">Book your session now</span>
      </button>

      {/* Floating Chatbot Button */}
      <button className="fab-btn chatbot-btn" aria-label="Chatbot">
        <i className="fas fa-comments"></i>
        <span className="tooltip">Chatbot</span>
      </button>
    </main>
  );
};

export default TeacherHome;

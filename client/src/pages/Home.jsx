import React from "react";
import "./Home.css";

const Feature = ({ title, text, icon }) => (
  <div className="feature-card" role="article" aria-label={title}>
    <div className="feature-icon" aria-hidden="true">{icon}</div>
    <div className="feature-text">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  </div>
);

const Home = () => {
  return (
    <main className="home-container">
      {/* HERO with background video */}
      <section className="hero" aria-labelledby="hero-title">
        <video className="hero-video" autoPlay muted loop playsInline>
          <source src="/uploads/vdo2.mp4" type="video/mp4" />
        </video>
        <div className="overlay"></div>

        <div className="hero-inner fade-up">
          <h1 id="hero-title">CampusCare — AI for Student Wellbeing</h1>
          <p>
            Personalized <span className="highlight">mental health</span> support, 
            intelligent resources, and caring counsellor connections — 
            all in one <span className="highlight">student-first</span> platform.
          </p>
          <div className="hero-actions">
            <button className="hero-btn primary glow">🚀 Get Started</button>
            <button className="hero-btn ghost">✨ Learn More</button>
          </div>
        </div>

        {/* floating blobs */}
        <div className="blob b1"></div>
        <div className="blob b2"></div>
        <div className="blob b3"></div>
      </section>

      {/* FEATURES */}
      <section className="features" aria-labelledby="features-title">
        <h2 id="features-title" className="fade-in">✨ What We Offer</h2>
        <div className="feature-grid">
          <Feature
            title="Counsellor Sessions"
            text="Book confidential sessions with certified counsellors — flexible & private."
            icon={<i className="fas fa-user-md"></i>}
          />
          <Feature
            title="AI Mood Check"
            text="Quick, friendly assessments using audio/text cues to suggest resources."
            icon={<i className="fas fa-brain"></i>}
          />
          <Feature
            title="Resources & Tools"
            text="Guided exercises, study planners, and coping toolkits curated for students."
            icon={<i className="fas fa-book-open"></i>}
          />
          <Feature
            title="24/7 AI Chatbot"
            text="An empathetic assistant for instant responses and crisis guidance."
            icon={<i className="fas fa-robot"></i>}
          />
        </div>
      </section>

      {/* CHATROOM */}
      <section className="chatroom" aria-labelledby="chatroom-title">
        <h2 id="chatroom-title">💬 Student ChatRoom</h2>
        <p>Connect, share, and support each other in a safe AI-moderated space.</p>
        <div className="chatroom-box pulse">
          <div className="chat-bubble">👩 Hey, how are you feeling today?</div>
          <div className="chat-bubble alt">🤖 I’m here to listen anytime 💙</div>
          <div className="chat-bubble">👨 I feel stressed about exams 😟</div>
        </div>
      </section>

      {/* GAMES */}
      <section className="games" aria-labelledby="games-title">
        <h2 id="games-title">🎮 Relax with Mindful Games</h2>
        <div className="game-grid">
          <div className="game-card">🧩 Puzzle</div>
          <div className="game-card">🎵 Music Quiz</div>
          <div className="game-card">🖌️ Drawing Pad</div>
          <div className="game-card">🧘 Meditation Timer</div>
        </div>
      </section>

      {/* CALENDAR + SESSIONS */}
      <section className="calendar" aria-labelledby="calendar-title">
        <h2 id="calendar-title">📅 Book Your Session</h2>
        <p>Schedule appointments or join live online wellbeing sessions.</p>
        <div className="calendar-box">
          <input type="date" />
          <button className="signup-btn">Book Now</button>
        </div>
        <div className="sessions">
          <h3>Upcoming Live Sessions</h3>
          <ul>
            <li>🌐 Stress Management Workshop — 15 Sept, 5 PM</li>
            <li>💡 Productivity Hacks Webinar — 18 Sept, 7 PM</li>
            <li>🧘 Guided Meditation — 20 Sept, 6 PM</li>
          </ul>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about slide-in" aria-labelledby="about-title">
        <div className="about-card">
          <h2 id="about-title">💡 About CampusCare</h2>
          <p>
            CampusCare blends <span className="highlight">human counselling</span> 
            with AI-driven insights to make mental health approachable. 
            We focus on early support, privacy, and evidence-based tools 
            so students can thrive academically and emotionally.
          </p>
          <ul className="about-list">
            <li>🔒 Confidential & Secure</li>
            <li>📊 Data-Informed Recommendations</li>
            <li>🎓 Student-First Design</li>
          </ul>
        </div>
        <div className="about-visual">
          <div className="visual-illustration pulse">AI + ❤️</div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta" aria-labelledby="cta-title">
        <h2 id="cta-title" className="fade-up">🚀 Ready to Start Your Wellness Journey?</h2>
        <p>Join thousands of students using CampusCare to build resilience and study smarter.</p>
        <div className="cta-actions">
          <button className="signup-btn glow">Join Now</button>
          <button className="secondary">Talk to an Expert</button>
        </div>
      </section>

      {/* Floating Chatbot Button */}
      <button className="chatbot-btn" aria-label="Open Chatbot">
        <i className="fas fa-comment-dots"></i>
      </button>
    </main>
  );
};

export default Home;

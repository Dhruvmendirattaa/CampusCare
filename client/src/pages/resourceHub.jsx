import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material"; // Material-UI tabs
import { FaChevronDown } from "react-icons/fa";
import "./resourceHub.css";

const resources = {
  Audios: {
    Relaxation: [
      {
        title: "Powerful Mindfulness Meditation",
        src: "https://archive.org/download/PowerfulMindfulnessMeditation/PowerfulMindfulnessMeditation.mp3",
      },
      {
        title: "3-Min Body Scan",
        src: "https://www.freemindfulness.org/sites/default/files/FreeMindfulness3min.mp3",
      },
    ],
    Concentration: [
      {
        title: "Deep Focus Music",
        src: "https://archive.org/download/DeepFocusMusic/DeepFocusMusic.mp3",
      },
    ],
    Sleeping: [
      {
        title: "Guided Sleep Meditation",
        src: "https://archive.org/download/DeepSleepMeditation/DeepSleepMeditation.mp3",
      },
    ],
  },
  Videos: {
    "Mind Relaxation": [
      {
        title: "1 Hour Concentration Music",
        embed: "https://www.youtube.com/embed/88ExZwnCU44",
      },
      {
        title: "Deep Focus Music",
        embed: "https://www.youtube.com/embed/ZmojhJU-Iak",
      },
    ],
    "Exam Stress": [
      {
        title: "How to Overcome Test Anxiety",
        embed: "https://www.youtube.com/embed/4PgEIlewf7Y",
      },
    ],
    "Depression/Anxiety": [
      {
        title: "TED Talk on Resilience",
        embed: "https://www.youtube.com/embed/KoqaUANGvpA",
      },
    ],
  },
  Tips: {
    "Daily Habits": [
      {
        title: "Maintain Proper Sleep",
        desc: "Aim for 7–8 hours of quality sleep every night. A consistent sleep routine improves concentration, reduces stress, and boosts immunity."
      },
      {
        title: "Stay Hydrated & Eat Healthy",
        desc: "Drink at least 2–3 liters of water daily and include fruits, vegetables, and whole grains in your diet. Avoid junk food and excessive caffeine."
      },
      {
        title: "Digital Detox",
        desc: "Limit your screen time, especially before sleeping. Excessive phone use affects your mental peace and reduces sleep quality."
      },
    ],
    "Study/Work Hacks": [
      {
        title: "Pomodoro Technique",
        desc: "Work in focused 25-minute sessions followed by a 5-minute break. After 4 sessions, take a longer 15–20 minute break to recharge."
      },
      {
        title: "Organized Workspace",
        desc: "Keep your desk clutter-free. A clean environment reduces distractions and increases productivity."
      },
      {
        title: "Prioritize Tasks",
        desc: "Make a to-do list daily and rank tasks by importance. Tackle the hardest task first (Eat That Frog method)."
      },
    ],
    "Stress Management": [
      {
        title: "Deep Breathing",
        desc: "Practice 4-7-8 breathing: inhale for 4 seconds, hold for 7 seconds, and exhale for 8 seconds. Repeat this cycle 4 times to calm anxiety."
      },
      {
        title: "Physical Activity",
        desc: "Go for a 15–20 minute walk, do yoga, or simple stretches. Exercise releases endorphins which improve mood instantly."
      },
      {
        title: "Journaling & Talking",
        desc: "Write down your thoughts in a diary or talk to a trusted friend. Expressing emotions reduces mental burden and brings clarity."
      },
    ],
  },
};

const ResourceHub = () => {
  const [tab, setTab] = useState("Audios");
  const [openCategory, setOpenCategory] = useState(null);

  return (
    <div className="resource-hub">
      <h1>🌿 Mental Wellness Pack 🌿</h1>
      <p className="subtitle">
        Curated audio, video & tips to help you relax, focus, sleep better,
        and manage stress, anxiety, and depression.
      </p>

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={(e, val) => setTab(val)}
        centered
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab value="Audios" label="🎧 Audios" />
        <Tab value="Videos" label="🎥 Videos" />
        <Tab value="Tips" label="💡 Tips & Tricks" />
      </Tabs>

      {/* Category Cards */}
      <div className="category-list">
        {Object.entries(resources[tab]).map(([category, items], idx) => (
          <div key={idx} className="category-card">
            <button
              className="category-header"
              onClick={() =>
                setOpenCategory(openCategory === category ? null : category)
              }
            >
              <span>{category}</span>
              <FaChevronDown
                className={openCategory === category ? "rotated" : ""}
              />
            </button>

            {openCategory === category && (
              <div className="category-content">
                {tab === "Audios" &&
                  items.map((item, i) => (
                    <div key={i} style={{ marginBottom: "16px" }}>
                      <p>{item.title}</p>
                      <audio controls src={item.src} />
                    </div>
                  ))}

                {tab === "Videos" &&
                  items.map((item, i) => (
                    <div key={i} style={{ marginBottom: "20px" }}>
                      <p>{item.title}</p>
                      <iframe
                        src={item.embed}
                        title={item.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ))}

                {tab === "Tips" &&
                  items.map((tip, i) => (
                    <div key={i} className="tip-item" style={{ marginBottom: "14px" }}>
                      <h4>✅ {tip.title}</h4>
                      <p>{tip.desc}</p>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceHub;

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
};

const ResourceHub = () => {
  const [tab, setTab] = useState("Audios");
  const [openCategory, setOpenCategory] = useState(null);

  return (
    <div className="resource-hub">
      <h1>🌿 Mental Wellness Pack 🌿</h1>
      <p className="subtitle">
        Curated audio & video resources to help you relax, focus, sleep better,
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
                {tab === "Audios"
                  ? items.map((item, i) => (
                      <div key={i} style={{ marginBottom: "16px" }}>
                        <p>{item.title}</p>
                        <audio controls src={item.src} />
                      </div>
                    ))
                  : items.map((item, i) => (
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
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceHub;

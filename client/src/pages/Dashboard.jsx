import React, { useState } from "react";
import "./Dashboard.css";
import DearDiary from "../Components/DearDiary"; // ✅ import DearDiary

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("appointments");
  const [nickname, setNickname] = useState("User123");
  const [mood, setMood] = useState("");
  const [avatar, setAvatar] = useState("default-avatar.png");

  const renderTabContent = () => {
    switch (activeTab) {
      case "appointments":
        return (
          <div className="tab-content">
            <h2>Scheduled Appointments</h2>
            <ul>
              <li>Therapy Session - 20 Sep, 4:00 PM</li>
              <li>Meditation Workshop - 25 Sep, 6:00 PM</li>
            </ul>
          </div>
        );

      case "events":
        return (
          <div className="tab-content">
            <h2>Enrolled Seminars / Events</h2>
            <ul>
              <li>Mindfulness Seminar</li>
              <li>Stress Management Workshop</li>
            </ul>
          </div>
        );

      case "diary":
        return (
          <div className="tab-content">
            <h2>Dear Diary</h2>
            {/* ✅ Render the fully functional DearDiary component */}
            <DearDiary />
          </div>
        );

      case "analytics":
        return (
          <div className="tab-content">
            <h2>Progress Analytics</h2>
            <p>Mood trends, session progress, and activity insights will appear here.</p>
          </div>
        );

      case "mood":
        return (
          <div className="tab-content">
            <h2>Mood Tracker</h2>
            <input
              type="text"
              placeholder="How are you feeling today?"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            />
            <button>Update Mood</button>
          </div>
        );

      case "avatar":
        return (
          <div className="tab-content">
            <h2>Personalized Avatar</h2>
            <img src={avatar} alt="avatar" className="avatar-img" />
            <input type="file" onChange={(e) => setAvatar(URL.createObjectURL(e.target.files[0]))} />
          </div>
        );

      case "nickname":
        return (
          <div className="tab-content">
            <h2>Nickname Keeper</h2>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <p>Your nickname is: <strong>{nickname}</strong></p>
          </div>
        );

      case "downloads":
        return (
          <div className="tab-content">
            <h2>Downloaded Resources</h2>
            <ul>
              <li>Meditation Guide.pdf</li>
              <li>Stress Tracker.xlsx</li>
            </ul>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Mental Health Dashboard</h1>
      <div className="tabs">
        <button onClick={() => setActiveTab("appointments")} className={activeTab === "appointments" ? "active" : ""}>Appointments</button>
        <button onClick={() => setActiveTab("events")} className={activeTab === "events" ? "active" : ""}>Seminars / Events</button>
        <button onClick={() => setActiveTab("diary")} className={activeTab === "diary" ? "active" : ""}>Dear Diary</button>
        <button onClick={() => setActiveTab("analytics")} className={activeTab === "analytics" ? "active" : ""}>Progress Analytics</button>
        <button onClick={() => setActiveTab("mood")} className={activeTab === "mood" ? "active" : ""}>Mood Tracker</button>
        <button onClick={() => setActiveTab("avatar")} className={activeTab === "avatar" ? "active" : ""}>Avatar</button>
        <button onClick={() => setActiveTab("nickname")} className={activeTab === "nickname" ? "active" : ""}>Nickname</button>
        <button onClick={() => setActiveTab("downloads")} className={activeTab === "downloads" ? "active" : ""}>Downloads</button>
      </div>

      <div className="tab-container">{renderTabContent()}</div>
    </div>
  );
};

export default Dashboard;

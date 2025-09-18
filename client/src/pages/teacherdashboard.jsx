import React, { useState } from "react";
import "./TeacherDashboard.css";

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState("requests");
  const [nickname, setNickname] = useState("Teacher123");
  const [avatar, setAvatar] = useState("default-avatar.png");

  const renderTabContent = () => {
    switch (activeTab) {
      case "requests":
        return (
          <div className="tab-content">
            <h2>Appointment Requests</h2>
            <ul>
              <li>John Doe - 20 Sep, 4:00 PM</li>
              <li>Jane Smith - 21 Sep, 3:30 PM</li>
            </ul>
          </div>
        );
      case "seminars":
        return (
          <div className="tab-content">
            <h2>Add Seminars for Students</h2>
            <form>
              <input type="text" placeholder="Seminar Title" />
              <input type="date" />
              <input type="time" />
              <button type="submit">Add Seminar</button>
            </form>
          </div>
        );
      case "avatar":
        return (
          <div className="tab-content">
            <h2>Personalized Avatar</h2>
            <img src={avatar} alt="avatar" className="avatar-img" />
            <input
              type="file"
              onChange={(e) =>
                setAvatar(URL.createObjectURL(e.target.files[0]))
              }
            />
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
            <p>
              Your nickname is: <strong>{nickname}</strong>
            </p>
          </div>
        );
      case "downloads":
        return (
          <div className="tab-content">
            <h2>Downloaded Resources</h2>
            <ul>
              <li>Student Progress Report.pdf</li>
              <li>Seminar Plan Template.docx</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      
      <div className="tabs">
        <button
          onClick={() => setActiveTab("requests")}
          className={activeTab === "requests" ? "active" : ""}
        >
          Appointment Requests
        </button>
        <button
          onClick={() => setActiveTab("seminars")}
          className={activeTab === "seminars" ? "active" : ""}
        >
          Add Seminars
        </button>
        <button
          onClick={() => setActiveTab("avatar")}
          className={activeTab === "avatar" ? "active" : ""}
        >
          Avatar
        </button>
        <button
          onClick={() => setActiveTab("nickname")}
          className={activeTab === "nickname" ? "active" : ""}
        >
          Nickname
        </button>
        <button
          onClick={() => setActiveTab("downloads")}
          className={activeTab === "downloads" ? "active" : ""}
        >
          Downloads
        </button>
      </div>

      <div className="tab-container">{renderTabContent()}</div>
    </div>
  );
};

export default TeacherDashboard;

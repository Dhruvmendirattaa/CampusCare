import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import "./Dashboard.css";
import DearDiary from "../Components/DearDiary";
import MoodTracker from "../Components/MoodTracker";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("appointments");
  const [nickname, setNickname] = useState("User123");
  const [mood, setMood] = useState("");
  const [avatar, setAvatar] = useState("default-avatar.png");

  // 🔹 Appointments state
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axiosInstance.get("/appointments/my");
        setAppointments(res.data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };

    if (activeTab === "appointments") {
      fetchAppointments();
    }
  }, [activeTab]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "appointments":
        return (
          <div className="tab-content">
            <h2>📋 My Counseling Requests</h2>
            {appointments.length === 0 ? (
              <p>No requests yet.</p>
            ) : (
              <ul className="appointment-list">
                {appointments.map((a) => (
                  <li key={a._id} className="appointment-card">
                    <p><strong>Counselor:</strong> {a.counselorName}</p>
                    <p><strong>Specialization:</strong> {a.counselorSpecialization}</p>
                    <p><strong>Date:</strong> {a.date}</p>
                    <p><strong>Time:</strong> {a.time}</p>
                    <p><strong>Status:</strong> {a.status}</p>
                  </li>
                ))}
              </ul>
            )}
            <button className="manage-btn" onClick={() => navigate("/appointment")}>
              ⚙️ Manage Requests
            </button>
          </div>
        );

      case "diary":
        return (
          <div className="tab-content">
            <DearDiary />
          </div>
        );

      case "mood":
        return (
          <div className="tab-content">
            <MoodTracker />
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
        <button
          onClick={() => setActiveTab("appointments")}
          className={activeTab === "appointments" ? "active" : ""}
        >
          Appointments
        </button>
        <button
          onClick={() => setActiveTab("diary")}
          className={activeTab === "diary" ? "active" : ""}
        >
          Dear Diary
        </button>
        <button
          onClick={() => setActiveTab("mood")}
          className={activeTab === "mood" ? "active" : ""}
        >
          Mood Tracker
        </button>
        <button
          onClick={() => setActiveTab("avatar")}
          className={activeTab === "avatar" ? "active" : ""}
        >
          Avatar
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

export default Dashboard;

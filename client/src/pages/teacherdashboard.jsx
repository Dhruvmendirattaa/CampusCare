import React, { useState } from "react";
import "./TeacherDashboard.css";

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState("requests");
  const [nickname, setNickname] = useState("Teacher123");
  const [avatar, setAvatar] = useState("default-avatar.png");
  const [seminars, setSeminars] = useState([]);

  // Seminar submit handler
  const handleAddSeminar = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const seminarData = Object.fromEntries(formData.entries());

    // ✅ Backend integration placeholder
    // Example POST to backend: fetch("/api/seminars", {method:"POST", body:JSON.stringify(seminarData)})
    setSeminars((prev) => [...prev, seminarData]);
    alert("✅ Seminar added successfully!");
    e.target.reset();
  };

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
            <form onSubmit={handleAddSeminar} className="seminar-form">
              <input type="text" name="name" placeholder="Seminar Title" required />
              <input type="text" name="organizer" placeholder="Organizer Name" required />
              <input type="date" name="date" required />
              <input
                type="text"
                name="time"
                placeholder="Time (e.g., 3:00 PM - 5:00 PM)"
                required
              />
              <input type="text" name="venue" placeholder="Venue" required />
              <input
                type="text"
                name="whoCanAttend"
                placeholder="Who Can Attend (e.g., All Students)"
                required
              />
              <textarea
                name="benefits"
                placeholder="Benefits / Description"
                rows="3"
                required
              ></textarea>
              <button type="submit">Add Seminar</button>
            </form>

            {/* Display added seminars */}
            {seminars.length > 0 && (
              <div className="seminar-list">
                <h3>Added Seminars</h3>
                <div className="events-grid">
                  {seminars.map((event, index) => (
                    <div key={index} className="event-card">
                      <h4>{event.name}</h4>
                      <p><strong>Organizer:</strong> {event.organizer}</p>
                      <p><strong>Date:</strong> {event.date}</p>
                      <p><strong>Time:</strong> {event.time}</p>
                      <p><strong>Venue:</strong> {event.venue}</p>
                      <p><strong>Who Can Attend:</strong> {event.whoCanAttend}</p>
                      <p><strong>Benefits:</strong> {event.benefits}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case "avatar":
        return (
          <div className="tab-content">
            <h2>Personalized Avatar</h2>
            <img src={avatar} alt="avatar" className="avatar-img" />
            <input
              type="file"
              onChange={(e) => setAvatar(URL.createObjectURL(e.target.files[0]))}
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
      <h1 className="dashboard-title">Teacher Dashboard</h1>
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

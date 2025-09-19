import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import "./TeacherDashboard.css";

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState("requests");
  const [nickname, setNickname] = useState("Teacher123");
  const [avatar, setAvatar] = useState("default-avatar.png");
  const [seminars, setSeminars] = useState([]);
  const [appointments, setAppointments] = useState([]);

  // Fetch teacher's appointment requests
  const fetchAppointments = async () => {
    try {
      const res = await axiosInstance.get("/appointments/teacher-requests");
      setAppointments(res.data);
    } catch (err) {
      console.error("Error fetching appointment requests:", err);
    }
  };

  useEffect(() => {
    if (activeTab === "requests") fetchAppointments();
  }, [activeTab]);

  // Approve or Reject appointment
  const handleStatus = async (id, status) => {
    try {
      await axiosInstance.put(`/appointments/${id}`, { status });
      setAppointments(
        appointments.map((a) => (a._id === id ? { ...a, status } : a))
      );
    } catch (err) {
      alert("Error updating appointment status");
    }
  };

  // Seminar submit handler
  const handleAddSeminar = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const seminarData = Object.fromEntries(formData.entries());

    try {
      const res = await axiosInstance.post("/seminars", seminarData);
      setSeminars((prev) => [...prev, res.data]);
      alert("✅ Seminar added successfully!");
      e.target.reset();
    } catch (err) {
      console.error(err);
      alert("❌ Error adding seminar");
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "requests":
        return (
          <div className="tab-content">
            <h2>Appointment Requests</h2>
            {appointments.length === 0 ? (
              <p>No appointment requests yet.</p>
            ) : (
              <ul className="appointment-list">
                {appointments.map((a) => (
                  <li key={a._id} className="appointment-card">
                    <p><strong>Student:</strong> {a.student.name}</p>
                    <p><strong>Date:</strong> {a.date}</p>
                    <p><strong>Time:</strong> {a.time}</p>
                    <p><strong>Status:</strong> {a.status}</p>
                    {a.status === "pending" && (
                      <div className="status-buttons">
                        <button onClick={() => handleStatus(a._id, "approved")} className="approve-btn">✅ Approve</button>
                        <button onClick={() => handleStatus(a._id, "rejected")} className="reject-btn">❌ Reject</button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
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
              <input type="text" name="time" placeholder="Time (e.g., 3:00 PM - 5:00 PM)" required />
              <input type="text" name="venue" placeholder="Venue" required />
              <input type="text" name="whoCanAttend" placeholder="Who Can Attend" required />
              <textarea name="benefits" placeholder="Benefits / Description" rows="3" required></textarea>
              <button type="submit">Add Seminar</button>
            </form>
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
        <button onClick={() => setActiveTab("requests")} className={activeTab === "requests" ? "active" : ""}>Appointment Requests</button>
        <button onClick={() => setActiveTab("seminars")} className={activeTab === "seminars" ? "active" : ""}>Add Seminars</button>
        <button onClick={() => setActiveTab("avatar")} className={activeTab === "avatar" ? "active" : ""}>Avatar</button>
      
        <button onClick={() => setActiveTab("downloads")} className={activeTab === "downloads" ? "active" : ""}>Downloads</button>
      </div>

      <div className="tab-container">{renderTabContent()}</div>
    </div>
  );
};

export default TeacherDashboard;

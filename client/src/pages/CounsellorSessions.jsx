import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import "./CounsellorSessions.css";

const CounsellorSessions = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // check login status from localStorage
  const isLoggedIn = !!localStorage.getItem("token");

  const fetchEvents = async () => {
    try {
      const res = await axiosInstance.get("/seminars");
      setEvents(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching events:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) return <p>Loading events...</p>;

  return (
    <div className="counsellor-container">
      <h1 className="counsellor-title">College Events</h1>

      {/* sirf jab login nahi hai tabhi dikhao */}
      {!isLoggedIn && (
        <p className="counsellor-subtitle">
          Please Login to access ON-CAMPUS Counselling Sessions and Events/Seminars.
        </p>
      )}

      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <div key={event._id} className="event-card">
              <h2 className="event-name">{event.name}</h2>
              <p><strong>Organizer:</strong> {event.organizer}</p>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {event.time}</p>
              <p><strong>Venue:</strong> {event.venue}</p>
              <p><strong>Who Can Attend:</strong> {event.whoCanAttend}</p>
              <p><strong>Benefits:</strong> {event.benefits}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CounsellorSessions;

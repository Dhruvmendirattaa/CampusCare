import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance"; // Make sure this points to your Axios setup
import "./CounsellorSessions.css";

const CounsellorSessions = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch events/seminars from backend
  const fetchEvents = async () => {
    try {
      const res = await axiosInstance.get("/seminars"); // Endpoint to get seminars
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
      <p className="counsellor-subtitle">
        Stay updated with upcoming events and opportunities happening on campus.
      </p>

      {events.length === 0 ? (
        <p>No upcoming events.</p>
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

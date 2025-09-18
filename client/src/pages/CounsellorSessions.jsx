import React from "react";
import "./CounsellorSessions.css";

const CounsellorSessions = () => {
  // Dummy events data
  const events = [
    {
      name: "Mental Wellness Workshop",
      organizer: "Campus Counselling Club",
      date: "25 Sept 2025",
      time: "3:00 PM - 5:00 PM",
      venue: "Auditorium Hall A",
      whoCanAttend: "All college students & faculty",
      benefits: "Learn stress management techniques and mindfulness exercises.",
    },
    {
      name: "Career Guidance Seminar",
      organizer: "Training & Placement Cell",
      date: "30 Sept 2025",
      time: "11:00 AM - 1:00 PM",
      venue: "Seminar Room 3",
      whoCanAttend: "Final & Pre-final year students",
      benefits: "Get expert advice on career paths and skill development.",
    },
    {
      name: "Academic Improvement Bootcamp",
      organizer: "Student Academic Council",
      date: "5 Oct 2025",
      time: "10:00 AM - 2:00 PM",
      venue: "Library Conference Room",
      whoCanAttend: "Open for all UG and PG students",
      benefits: "Improve study techniques and time management skills.",
    },
  ];

  return (
    <div className="counsellor-container">
      <h1 className="counsellor-title">College Events</h1>
      <p className="counsellor-subtitle">
        Stay updated with upcoming events and opportunities happening on campus.
      </p>

      <div className="events-grid">
        {events.map((event, index) => (
          <div key={index} className="event-card">
            <h2 className="event-name">{event.name}</h2>
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
  );
};

export default CounsellorSessions;

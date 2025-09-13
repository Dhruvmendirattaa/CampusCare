import React, { useState } from "react";
import "./appointmentBooking.css";

const AppointmentPage = () => {
  const [step, setStep] = useState(1);
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Counselors Data
  const counselors = [
    {
      name: "Dr. Meera Sharma",
      specialization: "Clinical Psychologist",
      experience: "8 years",
      bio: "Expert in stress management and student counseling.",
      img: "/uploads/meera.jpg",
    },
    {
      name: "Dr. Rohan Verma",
      specialization: "Behavioral Therapist",
      experience: "5 years",
      bio: "Helps students with anxiety, focus, and study habits.",
      img: "/uploads/rohan.jpg",
    },
    {
      name: "Dr. Aditi Kapoor",
      specialization: "Cognitive Therapist",
      experience: "6 years",
      bio: "Specializes in emotional well-being and mindfulness.",
      img: "/uploads/aditi.jpg",
    },
    {
      name: "Dr. Karan Singh",
      specialization: "Family Counselor",
      experience: "7 years",
      bio: "Focuses on relationship and family support for students.",
      img: "/uploads/karan.jpg",
    },
    {
      name: "Dr. Neha Iyer",
      specialization: "Child & Adolescent Psychologist",
      experience: "9 years",
      bio: "Helps young adults manage stress and transitions.",
      img: "/uploads/neha.jpg",
    },
    {
      name: "Dr. Arjun Desai",
      specialization: "Motivational Coach",
      experience: "4 years",
      bio: "Guides on career goals and overcoming challenges.",
      img: "/uploads/arjun.jpg",
    },
  ];

  const handleRequest = (counselor) => {
    setSelectedCounselor(counselor);
    setStep(2);
  };

  return (
    <div className="appointment-wrapper">
      <video autoPlay muted loop playsInline className="bg-video">
        <source src="/uploads/vdo2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <h1 className="title">✨ Book Your On-Campus Counseling Session ✨</h1>

      <section className="card">
        {/* Step 1 - Show Counselors */}
        {step === 1 && (
          <div className="step">
            <h3>👩‍⚕️ Available Counselors</h3>
            <div className="counselor-grid">
              {counselors.map((c, index) => (
                <div key={index} className="counselor-card">
                  <img src={c.img} alt={c.name} className="counselor-pic" />
                  <h4>{c.name}</h4>
                  <p><strong>{c.specialization}</strong> • {c.experience}</p>
                  <button
                    className="request-btn"
                    onClick={() => handleRequest(c)}
                  >
                    📩 Request Appointment
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 - Select Date */}
        {step === 2 && (
          <div className="step">
            <h3>📅 Select Date</h3>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="date-picker"
              min={new Date().toISOString().split("T")[0]}
            />
            <div className="nav-btns">
              <button onClick={() => setStep(1)} className="back-btn">⬅️ Back</button>
              <button
                disabled={!date}
                onClick={() => setStep(3)}
                className="next-btn"
              >
                Next ➡️
              </button>
            </div>
          </div>
        )}

        {/* Step 3 - Select Time */}
        {step === 3 && (
          <div className="step">
            <h3>⏰ Select Time</h3>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="dropdown"
            >
              <option value="">-- Select a Time Slot --</option>
              <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
              <option value="Afternoon (1 PM - 4 PM)">Afternoon (1 PM - 4 PM)</option>
              <option value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option>
            </select>
            <div className="nav-btns">
              <button onClick={() => setStep(2)} className="back-btn">⬅️ Back</button>
              <button
                disabled={!time}
                onClick={() => setStep(4)}
                className="next-btn"
              >
                Next ➡️
              </button>
            </div>
          </div>
        )}

        {/* Step 4 - Bio and Confirm */}
        {step === 4 && selectedCounselor && (
          <div className="step">
            <h3>👤 Counselor Details</h3>
            <div className="counselor-card large">
              <img
                src={selectedCounselor.img}
                alt={selectedCounselor.name}
                className="counselor-pic"
              />
              <h4>{selectedCounselor.name}</h4>
              <p><strong>{selectedCounselor.specialization}</strong> • {selectedCounselor.experience}</p>
              <p className="bio">{selectedCounselor.bio}</p>
              <p><strong>Date:</strong> {date}</p>
              <p><strong>Time:</strong> {time}</p>
              <button className="submit-btn">✅Request Appointment</button>
            </div>
            <button onClick={() => setStep(3)} className="back-btn">⬅️ Back</button>
          </div>
        )}
      </section>
    </div>
  );
};

export default AppointmentPage;

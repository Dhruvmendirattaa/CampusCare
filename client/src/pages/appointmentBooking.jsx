import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import "./appointmentBooking.css";

const AppointmentPage = () => {
  const [step, setStep] = useState(1);
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [appointments, setAppointments] = useState([]);

  // Hardcoded counselors (could later fetch from backend)
  const counselors = [
    { name: "Dr. Meera Sharma", specialization: "Clinical Psychologist", experience: "8 years", bio: "Expert in stress management and student counseling.", img: "/uploads/meera.jpg" },
    { name: "Dr. Rohan Verma", specialization: "Behavioral Therapist", experience: "5 years", bio: "Helps students with anxiety, focus, and study habits.", img: "/uploads/rohan.jpg" },
    { name: "Dr. Aditi Kapoor", specialization: "Cognitive Therapist", experience: "6 years", bio: "Specializes in emotional well-being and mindfulness.", img: "/uploads/aditi.jpg" },
    { name: "Dr. Karan Singh", specialization: "Family Counselor", experience: "7 years", bio: "Focuses on relationship and family support for students.", img: "/uploads/karan.jpg" },
    { name: "Dr. Neha Iyer", specialization: "Child & Adolescent Psychologist", experience: "9 years", bio: "Helps young adults manage stress and transitions.", img: "/uploads/neha.jpg" },
    { name: "Dr. Arjun Desai", specialization: "Motivational Coach", experience: "4 years", bio: "Guides on career goals and overcoming challenges.", img: "/uploads/arjun.jpg" },
  ];

  // 🔹 Fetch existing appointments
  const fetchAppointments = async () => {
    try {
      const res = await axiosInstance.get("/appointments/my");
      setAppointments(res.data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // 🔹 Handle booking
  const handleSubmit = async () => {
    if (!date || !time || !selectedCounselor) return;
    try {
      setLoading(true);
      const res = await axiosInstance.post("/appointments", {
        counselorName: selectedCounselor.name,
        counselorSpecialization: selectedCounselor.specialization,
        date,
        time,
      });
      setSuccess(res.data.message);
      setStep(1);
      setDate("");
      setTime("");
      setSelectedCounselor(null);
      fetchAppointments(); // refresh list after booking
    } catch (err) {
      alert(err.response?.data?.message || "Error booking appointment");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle cancel appointment
  const cancelAppointment = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
    try {
      await axiosInstance.delete(`/appointments/${id}`);
      setAppointments(appointments.filter((a) => a._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Error cancelling");
    }
  };

  return (
    <div className="appointment-wrapper">
      <video autoPlay muted loop playsInline className="bg-video">
        <source src="/uploads/vdo2.mp4" type="video/mp4" />
      </video>

      <h1 className="title">✨ Book Your On-Campus Counseling Session ✨</h1>

      {success && <div className="success-msg">{success}</div>}

      {/* 📋 Section 1: My Requests */}
      <section className="card">
        <h2>📋 My Appointment Requests</h2>
        {appointments.length === 0 ? (
          <p>No appointments yet.</p>
        ) : (
          <ul className="appointment-list">
            {appointments.map((a) => (
              <li key={a._id} className="appointment-card">
                <p><strong>Counselor:</strong> {a.counselorName}</p>
                <p><strong>Specialization:</strong> {a.counselorSpecialization}</p>
                <p><strong>Date:</strong> {a.date}</p>
                <p><strong>Time:</strong> {a.time}</p>
                <p><strong>Status:</strong> {a.status}</p>
                <button onClick={() => cancelAppointment(a._id)} className="cancel-btn">
                  ❌ Cancel
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* 📅 Section 2: Booking Flow */}
      <section className="card">
        {step === 1 && (
          <div className="step">
            <h3>👩‍⚕️ Available Counselors</h3>
            <div className="counselor-grid">
              {counselors.map((c, index) => (
                <div key={index} className="counselor-card">
                  <img src={c.img} alt={c.name} className="counselor-pic" />
                  <h4>{c.name}</h4>
                  <p><strong>{c.specialization}</strong> • {c.experience}</p>
                  <button className="request-btn" onClick={() => setStep(2) || setSelectedCounselor(c)}>
                    📩 Request Appointment
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

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
              <button disabled={!date} onClick={() => setStep(3)} className="next-btn">Next ➡️</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step">
            <h3>⏰ Select Time</h3>
            <select value={time} onChange={(e) => setTime(e.target.value)} className="dropdown">
              <option value="">-- Select a Time Slot --</option>
              <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
              <option value="Afternoon (1 PM - 4 PM)">Afternoon (1 PM - 4 PM)</option>
              <option value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option>
            </select>
            <div className="nav-btns">
              <button onClick={() => setStep(2)} className="back-btn">⬅️ Back</button>
              <button disabled={!time} onClick={() => setStep(4)} className="next-btn">Next ➡️</button>
            </div>
          </div>
        )}

        {step === 4 && selectedCounselor && (
          <div className="step">
            <h3>👤 Counselor Details</h3>
            <div className="counselor-card large">
              <img src={selectedCounselor.img} alt={selectedCounselor.name} className="counselor-pic" />
              <h4>{selectedCounselor.name}</h4>
              <p><strong>{selectedCounselor.specialization}</strong> • {selectedCounselor.experience}</p>
              <p className="bio">{selectedCounselor.bio}</p>
              <p><strong>Date:</strong> {date}</p>
              <p><strong>Time:</strong> {time}</p>
              <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
                {loading ? "Submitting..." : "✅ Request Appointment"}
              </button>
            </div>
            <button onClick={() => setStep(3)} className="back-btn">⬅️ Back</button>
          </div>
        )}
      </section>
    </div>
  );
};

export default AppointmentPage;

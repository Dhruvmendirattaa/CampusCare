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
  const [counselors, setCounselors] = useState([]); // 🔹 fetched from DB

  // 🔹 Fetch teachers from backend
  const fetchCounselors = async () => {
    try {
      const res = await axiosInstance.get("/users/teachers");
      setCounselors(res.data);
    } catch (err) {
      console.error("Error fetching teachers:", err);
    }
  };

  // 🔹 Fetch student’s appointments
  const fetchAppointments = async () => {
    try {
      const res = await axiosInstance.get("/appointments/my");
      setAppointments(res.data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  useEffect(() => {
    fetchCounselors();
    fetchAppointments();
  }, []);

  // 🔹 Handle booking
  const handleSubmit = async () => {
    if (!date || !time || !selectedCounselor) return;
    try {
      setLoading(true);
      const res = await axiosInstance.post("/appointments", {
        teacherId: selectedCounselor._id,
        date,
        time,
      });
      setSuccess(res.data.message);
      setStep(1);
      setDate("");
      setTime("");
      setSelectedCounselor(null);
      fetchAppointments();
    } catch (err) {
      alert(err.response?.data?.message || "Error booking appointment");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Cancel appointment
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

      {/* 📋 My Requests */}
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

      {/* 📅 Booking Flow */}
      <section className="card">
        {step === 1 && (
          <div className="step">
            <h3>👩‍⚕️ Available Counselors</h3>
            <div className="counselor-grid">
              {counselors.map((c) => (
                <div key={c._id} className="counselor-card">
                  <h4>{c.name}</h4>
                  <p><strong>{c.course || "No specialization"}</strong></p>
                  <p>{c.bio}</p>
                  <button
                    className="request-btn"
                    onClick={() => setStep(2) || setSelectedCounselor(c)}
                  >
                    📩 Request Appointment
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Date selection */}
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

        {/* Time selection */}
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

        {/* Confirmation */}
        {step === 4 && selectedCounselor && (
          <div className="step">
            <h3>👤 Counselor Details</h3>
            <div className="counselor-card large">
              <h4>{selectedCounselor.name}</h4>
              <p><strong>{selectedCounselor.course || "N/A"}</strong></p>
              <p>{selectedCounselor.bio}</p>
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

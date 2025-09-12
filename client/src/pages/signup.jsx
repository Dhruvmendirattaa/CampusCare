import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    age: "",
    institute: "",
    year: "",
    course: "",
    username: "",
    password: "",
    bio: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🔹 Age calculation
  const calculateAge = (dob) => {
    if (!dob) return "";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // 🔹 Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "dob" && { age: calculateAge(value) }),
    }));
  };

  // 🔹 Submit form with API call
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.dob || !formData.username || !formData.password) {
      setError("Please fill in all required fields");
      return;
    }
    if (formData.institute && (!formData.year || !formData.course)) {
      setError("Please fill in Year and Course for the institute");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      // ✅ Save JWT token
      localStorage.setItem("token", data.token);

      alert("Signup successful!");
      navigate("/dashboard"); // redirect after signup
    } catch (err) {
      console.error("Signup Error:", err);
      setError("Something went wrong, please try again.");
    }
  };

  return (
    <div className="signup-container">
      {/* Left Section with Video Background */}
      <div className="signup-left">
        <video src="/uploads/vdo2.mp4" autoPlay loop muted playsInline />
        <div className="signup-left-content"></div>
      </div>

      {/* Right Section */}
      <div className="signup-right">
        <h2>Welcome! Let's Create Your Account</h2>
        <p>Fill in your details</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name *"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="date"
            name="dob"
            placeholder="Date of Birth *"
            value={formData.dob}
            onChange={handleChange}
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            readOnly
          />

          <input
            type="text"
            name="institute"
            placeholder="Institute Name (optional)"
            value={formData.institute}
            onChange={handleChange}
          />

          {formData.institute && (
            <>
              <input
                type="text"
                name="year"
                placeholder="Year"
                value={formData.year}
                onChange={handleChange}
              />
              <input
                type="text"
                name="course"
                placeholder="Course"
                value={formData.course}
                onChange={handleChange}
              />
            </>
          )}

          <input
            type="text"
            name="username"
            placeholder="Username *"
            value={formData.username}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Set Password *"
            value={formData.password}
            onChange={handleChange}
          />

          <textarea
            name="bio"
            placeholder="Add Bio (optional)"
            value={formData.bio}
            onChange={handleChange}
          ></textarea>

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
          {error && <p className="error-text">{error}</p>}
        </form>

        <p className="login-text">
          Already have an account? <Link to="/login">Login here</Link>
        </p>

        <div className="footer-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/cookies">Cookies Settings</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;

import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useAuth } from "../AuthContext";
import "./MoodTracker.css";

const moods = [
  { emoji: "😃", label: "Happy", color: "#FFD700" },
  { emoji: "😢", label: "Sad", color: "#1E90FF" },
  { emoji: "😡", label: "Angry", color: "#FF4500" },
  { emoji: "😴", label: "Tired", color: "#A9A9A9" },
  { emoji: "🤩", label: "Excited", color: "#32CD32" },
];

const MoodTracker = () => {
  const { user } = useAuth();
  const token = user ? localStorage.getItem("token") : null;

  const [selectedMoods, setSelectedMoods] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Toggle mood checkbox
  const toggleMood = (label) => {
    setSelectedMoods((prev) =>
      prev.includes(label) ? prev.filter((m) => m !== label) : [...prev, label]
    );
  };

  // Save today's moods
  const handleSave = async () => {
    if (!selectedMoods.length) return;
    setLoading(true);
    setError("");

    try {
      // Save each selected mood for today
      await Promise.all(
        selectedMoods.map((mood) =>
          fetch("http://localhost:5000/api/mood", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ mood }),
          })
        )
      );

      setSelectedMoods([]);
      fetchStats(); // refresh chart
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to save moods");
      setLoading(false);
    }
  };

  // Fetch last 7 days mood stats
  const fetchStats = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/mood/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) fetchStats();
  }, [user]);

  // Prepare pie chart data
  const pieData = Object.keys(stats).map((key) => ({
    name: key,
    value: Number(stats[key]),
    color: moods.find((m) => m.label === key)?.color || "#ccc",
  }));

  return (
    <div className="mood-container">
      <h1>😊 Mood Tracker</h1>
      <p>Select how you’re feeling today:</p>

      <div className="mood-options">
        {moods.map((m) => (
          <label key={m.label} className="mood-checkbox">
            <input
              type="checkbox"
              checked={selectedMoods.includes(m.label)}
              onChange={() => toggleMood(m.label)}
            />
            <span>{m.emoji} {m.label}</span>
          </label>
        ))}
      </div>

      <button onClick={handleSave} disabled={loading}>
        {loading ? "Saving..." : "Save Mood"}
      </button>
      {error && <p className="error">{error}</p>}

      <h2>Last Week Mood Stats</h2>
      <div className="pie-container">
        {pieData.length > 0 ? (
          <>
            <PieChart width={400} height={300}>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
            </PieChart>
            <div className="pie-data">
              {pieData.map((entry) => (
                <p key={entry.name}>
                  {entry.name}: {entry.value}%
                </p>
              ))}
            </div>
          </>
        ) : (
          <p>No moods recorded in the last week.</p>
        )}
      </div>

    </div>
  );
};

export default MoodTracker;

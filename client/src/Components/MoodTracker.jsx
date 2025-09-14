import React, { useState } from "react";
import "./MoodTracker.css";

const moods = [
  { emoji: "😃", label: "Happy" },
  { emoji: "😢", label: "Sad" },
  { emoji: "😡", label: "Angry" },
  { emoji: "😴", label: "Tired" },
  { emoji: "🤩", label: "Excited" },
];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);

  return (
    <div className="mood-container">
      <h1>😊 Mood Tracker</h1>
      <p>Select how you’re feeling today:</p>
      <div className="mood-options">
        {moods.map((m, i) => (
          <button
            key={i}
            className={`mood-btn ${selectedMood === m.label ? "active" : ""}`}
            onClick={() => setSelectedMood(m.label)}
          >
            {m.emoji}
          </button>
        ))}
      </div>

      {selectedMood && (
        <div className="mood-result">
          <h3>You’re feeling: {selectedMood}</h3>
        </div>
      )}
    </div>
  );
};

export default MoodTracker;

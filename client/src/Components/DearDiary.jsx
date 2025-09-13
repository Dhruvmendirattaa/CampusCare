import React, { useState } from "react";
import "./DearDiary.css";

const DearDiary = () => {
  const [entry, setEntry] = useState("");
  const [entries, setEntries] = useState([]);

  const handleSave = () => {
    if (entry.trim()) {
      setEntries([{ text: entry, date: new Date().toLocaleString() }, ...entries]);
      setEntry("");
    }
  };

  return (
    <div className="diary-container">
      <h1>📔 Dear Diary</h1>
      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="Write your thoughts..."
      />
      <button onClick={handleSave}>Save Entry</button>

      <div className="entries">
        {entries.length === 0 ? (
          <p>No entries yet...</p>
        ) : (
          entries.map((e, i) => (
            <div key={i} className="entry">
              <p>{e.text}</p>
              <small>{e.date}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DearDiary;

import React, { useEffect, useState } from "react";
import "./DearDiary.css";
import { useAuth } from "../AuthContext";

const DearDiary = () => {
  const [entry, setEntry] = useState("");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Get user and token from AuthContext
  const { user } = useAuth();
  const token = user?.token; // Use token from context instead of localStorage

  // Fetch diary entries from backend
  const fetchEntries = async () => {
    if (!token) return; // exit if no token
    try {
      const res = await fetch("http://localhost:5000/api/diary", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to fetch entries");
      }

      const data = await res.json();
      setEntries(data);
    } catch (err) {
      console.error("Failed to fetch diary entries:", err);
      setError(err.message || "Failed to load diary entries");
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [token]); // ✅ Add token as dependency to refetch if it changes

  // Save a new diary entry
  const handleSave = async () => {
    if (!entry.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/diary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: entry }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to save entry");
        setLoading(false);
        return;
      }

      setEntries((prev) => [data, ...prev]); // prepend new entry
      setEntry("");
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while saving the entry");
      setLoading(false);
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

      <button onClick={handleSave} disabled={loading || !token}>
        {loading ? "Saving..." : "Save Entry"}
      </button>

      {error && <p className="error-message">{error}</p>}

      <div className="entries">
        {entries.length === 0 ? (
          <p>No entries yet...</p>
        ) : (
          entries.map((e) => (
            <div key={e._id} className="entry">
              <p>{e.text}</p>
              <small>{new Date(e.createdAt).toLocaleString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DearDiary;

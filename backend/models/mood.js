// models/Mood.js
import mongoose from "mongoose";

const moodSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  moods: [{ type: String, required: true }],
  date: { type: Date, default: () => new Date().setHours(0, 0, 0, 0) },
}, { timestamps: true }); // <-- add this

export default mongoose.model("Mood", moodSchema);
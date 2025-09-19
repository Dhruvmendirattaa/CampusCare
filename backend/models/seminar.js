import mongoose from "mongoose";

const seminarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  organizer: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  whoCanAttend: { type: String, required: true },
  benefits: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

const Seminar = mongoose.model("Seminar", seminarSchema);
export default Seminar;

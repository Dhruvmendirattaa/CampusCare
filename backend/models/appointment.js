// backend/models/appointment.js
import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    teacher: { // 🔹 Add teacher reference
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    counselorName: { type: String, required: true },
    counselorSpecialization: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;

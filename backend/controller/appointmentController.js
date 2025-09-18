// backend/controllers/appointmentController.js
import Appointment from "../models/appointment.js";

// ✅ Student books an appointment
export const bookAppointment = async (req, res) => {
  try {
    const { counselorName, counselorSpecialization, date, time } = req.body;

    const appointment = await Appointment.create({
      student: req.user._id, // taken from JWT middleware
      counselorName,
      counselorSpecialization,
      date,
      time,
    });

    res.status(201).json({ message: "Appointment requested", appointment });
  } catch (error) {
    console.error("❌ Error booking appointment:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get student’s own appointments
export const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ student: req.user._id });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Teacher (admin) can see all
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("student", "name username");
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Teacher approves/rejects
export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Not found" });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ Cancel Appointment (Student)
export const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    // Only the student who booked can cancel
    const appointment = await Appointment.findOne({
      _id: id,
      student: req.user._id,
    });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found or not yours" });
    }

    await appointment.deleteOne();
    res.json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    console.error("❌ Cancel Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

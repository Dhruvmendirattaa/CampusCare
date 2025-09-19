import express from "express";
import {
  bookAppointment,
  getMyAppointments,
  cancelAppointment,
  updateStatus,
  getMyAppointmentsForTeacher, // 🔹 add this
} from "../controller/appointmentController.js";
import { protect, teacherOnly } from "../middleware/auth.js";

const router = express.Router();

// Student routes
router.post("/", protect, bookAppointment);
router.get("/my", protect, getMyAppointments);
router.delete("/:id", protect, cancelAppointment);

// Teacher routes
router.get("/teacher-requests", protect, teacherOnly, getMyAppointmentsForTeacher);
router.put("/:id", protect, updateStatus);

export default router;

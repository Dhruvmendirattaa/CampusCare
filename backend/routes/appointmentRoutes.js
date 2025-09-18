import express from "express";
import {
  bookAppointment,
  getMyAppointments,
  getAllAppointments,
  updateStatus,
  cancelAppointment,   // ✅ import
} from "../controller/appointmentController.js"; // check path typo: should be `controllers` not `controller`
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Student
router.post("/", protect, bookAppointment);
router.get("/my", protect, getMyAppointments);
router.delete("/:id", protect, cancelAppointment);   // ✅ cancel

// Teacher
router.get("/", protect, getAllAppointments);
router.put("/:id", protect, updateStatus);

export default router;

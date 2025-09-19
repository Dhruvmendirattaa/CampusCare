import express from "express";
import { addSeminar, getSeminars } from "../controller/seminarController.js";
import { protect, teacherOnly } from "../middleware/auth.js";

const router = express.Router();

// ✅ Add seminar (teacher only)
router.post("/", protect, teacherOnly, addSeminar);

// ✅ Get all upcoming seminars (students & teachers)
router.get("/", protect, getSeminars);

export default router;

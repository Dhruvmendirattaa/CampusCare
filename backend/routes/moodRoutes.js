import express from "express";
import { protect } from "../middleware/auth.js";
import { addMood, getMoodStats } from "../controller/moodController.js";

const router = express.Router();

router.post("/", protect, addMood);
router.get("/stats", protect, getMoodStats);

export default router;

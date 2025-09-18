import express from "express";
import { protect } from "../middleware/auth.js";
import { getDiaryEntries, addDiaryEntry } from "../controller/diaryController.js";

const router = express.Router();

// GET all entries for the logged-in user
router.get("/", protect, getDiaryEntries);

// POST a new diary entry
router.post("/", protect, addDiaryEntry);

export default router;

// routes/groupRoutes.js
import express from "express";
import { getGroupMembers, getGeneralGroupId } from "../controller/groupController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// ✅ Get all members of the single "General Student Group"
router.get("/members", protect, getGroupMembers);

router.get("/id", protect, getGeneralGroupId);

export default router;

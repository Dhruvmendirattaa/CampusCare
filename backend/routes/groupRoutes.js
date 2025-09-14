// routes/groupRoutes.js
import express from "express";
import {
  createGroup,
  getAllGroups,
  getGroupById,
  joinGroup,
  leaveGroup,
} from "../controller/groupController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// ✅ Create a new group (Admin only – you can later add role-based auth if needed)
router.post("/", protect, createGroup);

// ✅ Get all groups
router.get("/", protect, getAllGroups);

// ✅ Get single group by ID
router.get("/:id", protect, getGroupById);

// ✅ Join a group
router.post("/:id/join", protect, joinGroup);

// ✅ Leave a group
router.post("/:id/leave", protect, leaveGroup);

export default router;

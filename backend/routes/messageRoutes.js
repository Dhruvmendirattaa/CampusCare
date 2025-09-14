// routes/messageRoutes.js
import express from "express";
import {
  sendMessage,
  getMessages,
  deleteMessage,
} from "../controller/messageController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// ✅ Send a message to group
router.post("/:groupId", protect, sendMessage);

// ✅ Get all messages of a group
router.get("/:groupId", protect, getMessages);

// ✅ Delete a message (only sender or admin can delete)
router.delete("/:groupId/:messageId", protect, deleteMessage);

export default router;

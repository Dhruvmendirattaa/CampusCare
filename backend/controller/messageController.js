// controllers/messageController.js
import Message from "../models/message.js";
import Group from "../models/group.js";


// ✅ Send a new message to a group
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user._id;
    const { groupId } = req.params;

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    if (!group.members.includes(userId)) {
      return res.status(403).json({ message: "You are not a member of this group" });
    }

    const newMessage = await Message.create({
      groupId: group._id,
      senderId: userId,
      message,
    });

    // Populate sender info
    const populatedMessage = await newMessage.populate("senderId", "name username");

    // Broadcast via socket (if using Socket.IO)
    if (req.io) {
      req.io.to(group._id.toString()).emit("newMessage", populatedMessage);
    }

    res.status(201).json(populatedMessage);
  } catch (error) {
    console.error("❌ Error sending message:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ Get all messages of a group
export const getMessages = async (req, res) => {
  try {
    const { groupId } = req.params;

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    if (!group.members.includes(req.user._id)) {
      return res.status(403).json({ message: "You are not a member of this group" });
    }

    const messages = await Message.find({ groupId: group._id })
      .populate("senderId", "name username")
      .sort({ createdAt: 1 }); // oldest → newest

    res.status(200).json(messages);
  } catch (error) {
    console.error("❌ Error fetching messages:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ Delete a message (only sender or admin can delete)
export const deleteMessage = async (req, res) => {
  try {
    const { groupId, messageId } = req.params;
    const userId = req.user._id;

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    // Only sender or teacher (admin) can delete
    if (
      message.senderId.toString() !== userId.toString() &&
      req.user.role !== "teacher"
    ) {
      return res.status(403).json({ message: "Not authorized to delete this message" });
    }

    await message.deleteOne();
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting message:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

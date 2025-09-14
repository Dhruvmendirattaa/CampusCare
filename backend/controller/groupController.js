// controllers/groupController.js
import Group from "../models/group.js";
import User from "../models/user.js";


// ✅ Ensure the "General Student Group" exists (run once on server start)
export const createGeneralGroup = async () => {
  try {
    let group = await Group.findOne({ name: "General Student Group" });
    if (!group) {
      group = await Group.create({ name: "General Student Group", members: [] });
      console.log("✅ General Student Group created!");
    }
    return group;
  } catch (error) {
    console.error("❌ Error creating General Student Group:", error.message);
  }
};

// ✅ Add a student to the general group (called after registration)
export const addStudentToGeneralGroup = async (studentId) => {
  try {
    const group = await Group.findOne({ name: "General Student Group" });
    if (!group.members.includes(studentId)) {
      group.members.push(studentId);
      await group.save();
    }
  } catch (error) {
    console.error("❌ Error adding student to group:", error.message);
  }
};

// ✅ Get all members of the "General Student Group" (students only)
export const getGroupMembers = async (req, res) => {
  try {
    const group = await Group.findOne({ name: "General Student Group" })
      .populate("members", "name username role");

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json(group.members.filter((m) => m.role === "student"));
  } catch (error) {
    console.error("❌ Error fetching group members:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};



// =============================
// 📌 EXTRA CRUD OPERATIONS
// =============================

// ✅ Create a new group
export const createGroup = async (req, res) => {
  try {
    const { name } = req.body;
    const existing = await Group.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Group name already exists" });
    }

    const group = await Group.create({ name, members: [req.user._id] });
    res.status(201).json(group);
  } catch (error) {
    console.error("❌ Error creating group:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get all groups
export const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find().populate("members", "name username");
    res.status(200).json(groups);
  } catch (error) {
    console.error("❌ Error fetching groups:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get group by ID
export const getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate(
      "members",
      "name username role"
    );
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    res.status(200).json(group);
  } catch (error) {
    console.error("❌ Error fetching group:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Join a group
export const joinGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ message: "Group not found" });

    if (!group.members.includes(req.user._id)) {
      group.members.push(req.user._id);
      await group.save();
    }

    res.status(200).json({ message: "Joined group successfully", group });
  } catch (error) {
    console.error("❌ Error joining group:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Leave a group
export const leaveGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ message: "Group not found" });

    group.members = group.members.filter(
      (member) => member.toString() !== req.user._id.toString()
    );
    await group.save();

    res.status(200).json({ message: "Left group successfully", group });
  } catch (error) {
    console.error("❌ Error leaving group:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

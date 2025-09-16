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

// in groupController.js
export const getGeneralGroupId = async (req, res) => {
  try {
    const group = await Group.findOne({ name: "General Student Group" });
    if (!group) return res.status(404).json({ message: "Group not found" });
    res.json({ groupId: group._id });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

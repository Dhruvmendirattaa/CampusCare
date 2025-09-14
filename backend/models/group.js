// backend/models/group.js
import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // only one group with this name
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // referencing the User model
    },
  ],
}, { timestamps: true });

const Group = mongoose.model("Group", groupSchema);
export default Group;
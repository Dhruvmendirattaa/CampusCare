// models/User.js
import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "required"],
      trim: true,
      minlength: [2, "at least 2 characters long"],
      maxlength: [50, "cannot exceed 50 characters"],
    },
    dob: {
      type: Date,
      required: [true, "required"],
      validate: {
        validator: function (value) {
          return value <= new Date();
        },
        message: "Date of birth cannot be in the future",
      },
    },
    age: {
      type: Number,
      min: [10, "Above 10"],
      max: [75, "Below 75"],
    },
    institute: {
      type: String,
      trim: true,
      maxlength: [100, "Institute name cannot exceed 100 characters"],
    },
    year: {
      type: String,
      enum: ["1st", "2nd", "3rd", "4th", "5th", "Other"],
      default: "Other",
    },
    course: {
      type: String,
      trim: true,
      maxlength: [100, "cannot exceed 100 characters"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [4, "Username must be at least 4 characters long"],
      maxlength: [30, "Username cannot exceed 30 characters"],
      match: [/^[a-zA-Z0-9._]+$/, "Username can only contain letters, numbers, dots and underscores"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      maxlength: [128, "Password cannot exceed 128 characters"],
    },
    bio: {
      type: String,
      maxlength: [200, "Bio cannot exceed 200 characters"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
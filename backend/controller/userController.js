import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Group from "../models/group.js";   // ⬅️ import group model

// Generate token with role included
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const signupUser = async (req, res) => {
  try {
    const {
      name,
      nickname,
      dob,
      age,
      institute,
      year,
      course,
      username,
      password,
      bio,
      role = "student", // default role
    } = req.body;

    // Check if username exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      name,
      nickname,
      dob,
      age,
      institute,
      year,
      course,
      username,
      password: hashedPassword,
      bio,
      role,
    });

    const savedUser = await newUser.save();

    // 🔹 Auto-add students to "General Student Group"
    if (savedUser.role === "student") {
      let group = await Group.findOne({ name: "General Student Group" });
      if (group && !group.members.includes(savedUser._id)) {
        group.members.push(savedUser._id);
        await group.save();
      }
    }

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: savedUser._id,
        username: savedUser.username,
        name: savedUser.name,
        nickname: savedUser.nickname,
        role: savedUser.role,
      },
      token: generateToken(savedUser._id, savedUser.role),
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        nickname: user.nickname,
        role: user.role,
      },
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

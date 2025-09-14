import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

// Generate token with role included
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const signupUser = async (req, res) => {
  try {
    const { name, dob, age, institute, year, course, username, password, bio } = req.body;

    // Check if username exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔹 Role is always "student" when signing up
    const newUser = new User({
      name,
      dob,
      age,
      institute,
      year,
      course,
      username,
      password: hashedPassword,
      bio,
      role: "student",
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        name: newUser.name,
        role: newUser.role,
      },
      token: generateToken(newUser._id, newUser.role),
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
        role: user.role,
      },
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

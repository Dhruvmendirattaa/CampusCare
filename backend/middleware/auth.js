// middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/user.js";

/**
 * Middleware to protect routes (requires valid JWT token)
 */
export const protect = async (req, res, next) => {
  let token;

  // Check for Bearer token
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request (without password)
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      console.error("❌ Auth Error:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

/**
 * Middleware to allow only students
 */
export const studentOnly = (req, res, next) => {
  if (req.user && req.user.role === "student") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied: Students only" });
  }
};

/**
 * Middleware to allow only teachers (if needed later)
 */
export const teacherOnly = (req, res, next) => {
  if (req.user && req.user.role === "teacher") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied: Teachers only" });
  }
};

// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

import userRoutes from "./routes/userRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { createGeneralGroup } from "./controller/groupController.js"; // ✅ import function
import appointmentRoutes from "./routes/appointmentRoutes.js";


dotenv.config();

const app = express();
const httpServer = createServer(app); // ✅ wrap app with http server

// ✅ Attach socket.io
const io = new Server(httpServer, {
  cors: {
    origin: "*", // change to frontend URL for security
    methods: ["GET", "POST"],
  },
});

// ✅ Make io accessible inside routes/controllers
app.use((req, res, next) => {
  req.io = io;
  next();
});

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/appointments", appointmentRoutes);

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(async () => {
    console.log("✅ MongoDB connected");

    // Ensure "General Student Group" exists on startup
    await createGeneralGroup();
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// ✅ Socket.io events
io.on("connection", (socket) => {
  console.log("🟢 New client connected:", socket.id);

  // Join the general group room (always the same group)
  socket.on("joinGroup", (groupId) => {
    socket.join(groupId);
    console.log(`📌 User joined group: ${groupId}`);
  });

  // When a message is sent directly via socket (optional)
  socket.on("sendMessage", (data) => {
    io.to(data.groupId).emit("newMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);

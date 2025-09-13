// config/db.js
import mongoose from "mongoose";
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/CampusCare");
        console.log("✅ Database connected successfully");
    } catch (err) {
        console.error("❌ Connection error:", err.message);
        process.exit(1);
    }
};

export default connectDB;
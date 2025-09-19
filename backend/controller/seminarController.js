import Seminar from "../models/seminar.js";

// Add seminar (teacher only)
export const addSeminar = async (req, res) => {
  try {
    const seminar = await Seminar.create({
      ...req.body,
      createdBy: req.user.id,
    });
    res.status(201).json(seminar);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while adding seminar" });
  }
};

// Get all upcoming seminars
export const getSeminars = async (req, res) => {
  try {
    const today = new Date();
    const seminars = await Seminar.find({ date: { $gte: today } }).sort({ date: 1 });
    res.status(200).json(seminars);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while fetching seminars" });
  }
};

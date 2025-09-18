import DiaryEntry from "../models/dearDiary.js";

// ✅ Get all diary entries for the logged-in user
export const getDiaryEntries = async (req, res) => {
  try {
    const entries = await DiaryEntry.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch entries" });
  }
};

// ✅ Add a new diary entry
export const addDiaryEntry = async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: "Text is required" });

  try {
    const newEntry = new DiaryEntry({ user: req.user.id, text });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save entry" });
  }
};

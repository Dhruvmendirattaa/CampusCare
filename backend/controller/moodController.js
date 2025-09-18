import Mood from "../models/mood.js";

// Add or update today's mood
export const addMood = async (req, res) => {
  const { mood } = req.body;
  if (!mood) return res.status(400).json({ message: "Mood is required" });

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let existing = await Mood.findOne({ user: req.user.id, date: today });
    if (existing) {
      if (!existing.moods.includes(mood)) {
        existing.moods.push(mood); // add new mood instead of replacing
        await existing.save();
      }
      return res.status(200).json(existing);
    }

    const newMood = await Mood.create({ user: req.user.id, moods: [mood] });
    res.status(201).json(newMood);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save mood" });
  }
};

// Get mood stats for last 7 days
export const getMoodStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 6); // include today as 7th day

    const moodDocs = await Mood.find({
      user: req.user.id,
      date: { $gte: weekAgo },
    });

    // Count each mood in the moods array
    const stats = {};
    moodDocs.forEach((doc) => {
      doc.moods.forEach((m) => {
        stats[m] = (stats[m] || 0) + 1;
      });
    });

    // Convert counts to percentages
    const total = Object.values(stats).reduce((a, b) => a + b, 0) || 1; // total number of moods
    const percentages = {};
    for (let key in stats) {
      percentages[key] = ((stats[key] / total) * 100).toFixed(0);
    }

    res.json(percentages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch mood stats" });
  }
};

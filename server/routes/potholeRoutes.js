import express from "express";
import Pothole from "../models/Pothole.js"
const router = express.Router();

// Route để lưu thông tin lỗ
router.post('/potholes', async (req, res) => {
  const {
    latitude,
    longitude,
    totalHoles,
    holes,
    avgWidth,
    avgLength,
    badnessLevel,
    shouldAcross,
    analysisImage
  } = req.body;

  if (!latitude || !longitude || !totalHoles || !holes || !avgWidth || !avgLength || !badnessLevel || shouldAcross === undefined || !analysisImage) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const newPothole = new Pothole({
      latitude,
      longitude,
      totalHoles,
      holes,
      avgWidth,
      avgLength,
      badnessLevel,
      shouldAcross,
      analysisImage,
    });

    const savedPothole = await newPothole.save();
    res.status(201).json(savedPothole);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;

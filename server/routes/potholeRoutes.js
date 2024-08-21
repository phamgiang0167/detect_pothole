import express from "express";
import Pothole from "../models/Pothole.js"
import axios from "axios";
const router = express.Router();

// Route để lưu thông tin lỗ
router.post('/analyst', async (req, res) => {
  const response = await axios.post('http://127.0.0.1:5001/predict', {
    image: req.body.image,
  });

  try {
    const { total_holes, holes, avg_width, avg_length, badness_level, should_across, analysis_image, image_id } = response.data;
    if (total_holes === 0) {
      res.status(201).json(response.data);
      return;
    }
    const newPothole = new Pothole({
      latitude: req.body.lat,
      longitude: req.body.long,
      totalHoles: total_holes,
      holes,
      avgWidth: avg_width,
      avgLength: avg_length,
      badnessLevel: badness_level,
      shouldAcross: should_across,
      analysisImage: analysis_image,
      status: 'pending'
    });
    const savedPothole = await newPothole.save();
    res.status(201).json(savedPothole);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    // Tạo điều kiện tìm kiếm
    let filter = {};
    if (status) {
      filter.status = status;
    }

    // Phân trang
    const potholes = await Pothole.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .exec();

    const total = await Pothole.countDocuments(filter);

    res.json({
      data: potholes,
      totalPotholes: total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Endpoint để duyệt ảnh và cập nhật trạng thái là "activated"
router.post('/approve/:id', async (req, res) => {
  try {
    const potholeId = req.params.id;
    const pothole = await Pothole.findByIdAndUpdate(potholeId, { status: 'activated' }, { new: true });

    if (!pothole) {
      return res.status(404).json({ message: 'Pothole not found' });
    }

    res.json({ message: 'Pothole approved successfully', pothole });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


export default router;

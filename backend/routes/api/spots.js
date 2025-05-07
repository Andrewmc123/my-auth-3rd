const express = require('express');
const router = express.Router();
const db = require('../../db/models');
const { Spot } = db;

// Get all spots
router.get('/', async (req, res) => {
  const spots = await Spot.findAll();
  res.json(spots);
});

// Create a new spot
router.post('/', async (req, res) => {
  const { userId, name, description } = req.body;
  try {
    const spot = await Spot.create({ userId, name, description });
    res.status(201).json(spot);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

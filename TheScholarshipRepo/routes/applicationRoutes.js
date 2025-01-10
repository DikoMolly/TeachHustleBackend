const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

// POST /apply
router.post('/apply', async (req, res) => {
  const { name, email, mobileNumber, scholarshipType, reason } = req.body;

  try {
    const newApplication = new Application({
      name,
      email,
      mobileNumber,
      scholarshipType,
      reason,
    });

    await newApplication.save();
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error saving application', error: err.message });
  }
});

module.exports = router;

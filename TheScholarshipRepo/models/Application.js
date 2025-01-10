const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  scholarshipType: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Application', ApplicationSchema);

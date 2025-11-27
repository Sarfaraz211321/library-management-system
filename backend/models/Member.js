const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  membershipNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String },
  startDate: { type: Date, required: true },
  expiryDate: { type: Date, required: true },
  status: { type: String, enum: ['active','cancelled','expired'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Member', memberSchema);

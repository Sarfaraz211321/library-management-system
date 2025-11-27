const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  serialNo: { type: String, required: true, unique: true },
  type: { type: String, enum: ['book','movie'], default: 'book' },
  available: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  remarks: { type: String }
});

module.exports = mongoose.model('Book', bookSchema);

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  issueDate: { type: Date, required: true },
  returnDate: { type: Date },
  returned: { type: Boolean, default: false },
  fineAmount: { type: Number, default: 0 },
  finePaid: { type: Boolean, default: false },
  remarks: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);

const Transaction = require('../models/Transaction');
const Book = require('../models/Book');
const Member = require('../models/Member');

const calcFine = (issueDate, returnDate) => {
  // simple: 10 currency units per day late
  const due = new Date(issueDate);
  due.setDate(due.getDate() + 15);
  const diff = Math.ceil((returnDate - due) / (1000*60*60*24));
  return diff > 0 ? diff * 10 : 0;
};

exports.issueBook = async (req, res) => {
  try {
    const { serialNo, membershipNumber, issueDate, returnDate, remarks } = req.body;
    if (!serialNo || !membershipNumber || !issueDate) return res.status(400).json({ message: 'Missing fields' });

    const book = await Book.findOne({ serialNo });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (!book.available) return res.status(400).json({ message: 'Book not available' });

    const member = await Member.findOne({ membershipNumber });
    if (!member) return res.status(404).json({ message: 'Member not found' });

    const issue = new Date(issueDate);
    const ret = returnDate ? new Date(returnDate) : (()=>{const d=new Date(issue); d.setDate(d.getDate()+15); return d;})();
    // validations: issueDate cannot be less than today
    const today = new Date(); today.setHours(0,0,0,0);
    if (issue < today) return res.status(400).json({ message: 'Issue date cannot be less than today' });
    // return date cannot be greater than 15 days beyond issue?
    const maxRet = new Date(issue); maxRet.setDate(maxRet.getDate()+15);
    if (ret > maxRet) return res.status(400).json({ message: 'Return date cannot be greater than 15 days from issue' });

    const transaction = new Transaction({
      book: book._id,
      member: member._id,
      issueDate: issue,
      returnDate: ret,
      remarks
    });
    await transaction.save();
    book.available = false;
    await book.save();
    res.json({ transaction });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const { transactionId, returnDate, confirmReturn, finePaid } = req.body;
    if (!transactionId) return res.status(400).json({ message: 'Transaction id required' });
    const trans = await Transaction.findById(transactionId).populate('book').populate('member');
    if (!trans) return res.status(404).json({ message: 'Transaction not found' });
    if (trans.returned) return res.status(400).json({ message: 'Book already returned' });

    const ret = returnDate ? new Date(returnDate) : new Date();
    // calculate fine
    const fine = calcFine(trans.issueDate, ret);
    trans.returnDate = ret;
    trans.fineAmount = fine;
    // If confirm used -> go to Pay Fine page (front will handle). If fine>0 and finePaid is not true, cannot complete return.
    if (fine > 0 && !finePaid && !confirmReturn) {
      // front should show pay fine prompt, but we block finalizing until finePaid true or confirmReturn leads to pay page
      await trans.save();
      return res.json({ requiresPayment: true, fineAmount: fine, transaction: trans });
    }
    if (fine > 0 && finePaid) {
      trans.finePaid = true;
    }
    trans.returned = true;
    await trans.save();
    const book = await Book.findById(trans.book._id);
    book.available = true;
    await book.save();
    res.json({ message: 'Book returned', transaction: trans });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.payFine = async (req, res) => {
  try {
    const { transactionId, amount } = req.body;
    if (!transactionId) return res.status(400).json({ message: 'Transaction id required' });
    const trans = await Transaction.findById(transactionId);
    if (!trans) return res.status(404).json({ message: 'Transaction not found' });
    // assume amount covers the fine
    if (amount < trans.fineAmount) return res.status(400).json({ message: 'Insufficient amount' });
    trans.finePaid = true;
    await trans.save();
    // complete return if not already completed
    if (!trans.returned) {
      trans.returned = true;
      await trans.save();
      const book = await Book.findById(trans.book);
      if (book) { book.available = true; await book.save(); }
    }
    res.json({ message: 'Fine paid', transaction: trans });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const all = await Transaction.find().populate('book').populate('member');
    res.json(all);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

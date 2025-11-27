const Book = require('../models/Book');

exports.addBook = async (req, res) => {
  try {
    const { title, author, serialNo, type='book', remarks } = req.body;
    if (!title || !author || !serialNo) return res.status(400).json({ message: 'All fields required' });
    const exists = await Book.findOne({ serialNo });
    if (exists) return res.status(400).json({ message: 'Serial number already exists' });
    const book = new Book({ title, author, serialNo, type, remarks });
    await book.save();
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, serialNo, type='book', remarks, available } = req.body;
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (!title || !author || !serialNo) return res.status(400).json({ message: 'All fields required' });
    book.title = title; book.author = author; book.serialNo = serialNo; book.type = type;
    if (remarks !== undefined) book.remarks = remarks;
    if (available !== undefined) book.available = available;
    await book.save();
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.searchBooks = async (req, res) => {
  try {
    const q = req.query.q || '';
    const results = await Book.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { author: { $regex: q, $options: 'i' } },
        { serialNo: { $regex: q, $options: 'i' } }
      ]
    });
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

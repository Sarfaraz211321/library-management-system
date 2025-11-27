const express = require('express');
const router = express.Router();
const { auth, authorizeAdmin } = require('../middleware/auth');
const { addBook, updateBook, searchBooks } = require('../controllers/bookController');

router.get('/search', auth, searchBooks);
router.post('/', auth, authorizeAdmin, addBook);
router.put('/:id', auth, authorizeAdmin, updateBook);

module.exports = router;

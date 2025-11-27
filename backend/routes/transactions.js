const express = require('express');
const router = express.Router();
const { auth, authorizeAdmin } = require('../middleware/auth');
const {
  issueBook,
  returnBook,
  payFine,
  getTransactions
} = require('../controllers/transactionController');

router.post('/issue', auth, issueBook);
router.post('/return', auth, returnBook);
router.post('/pay', auth, payFine);
router.get('/', auth, getTransactions);

module.exports = router;

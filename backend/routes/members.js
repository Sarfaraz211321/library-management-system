const express = require('express');
const router = express.Router();
const { auth, authorizeAdmin } = require('../middleware/auth');
const { addMember, updateMembership, getMemberByNumber } = require('../controllers/memberController');

router.post('/', auth, addMember); // users can add membership
router.put('/', auth, updateMembership); // extend / cancel
router.get('/:membershipNumber', auth, getMemberByNumber);

module.exports = router;

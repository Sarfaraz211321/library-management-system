const Member = require('../models/Member');
const shortid = require('shortid');

exports.addMember = async (req, res) => {
  try {
    const { name, email, duration } = req.body; // duration: '6m','1y','2y'
    if (!name || !duration) return res.status(400).json({ message: 'Name and duration required' });
    const startDate = new Date();
    let expiry = new Date(startDate);
    if (duration === '6m') expiry.setMonth(expiry.getMonth() + 6);
    else if (duration === '1y') expiry.setFullYear(expiry.getFullYear() + 1);
    else if (duration === '2y') expiry.setFullYear(expiry.getFullYear() + 2);
    else return res.status(400).json({ message: 'Invalid duration' });
    const membershipNumber = `M-${shortid.generate()}`;
    const member = new Member({ membershipNumber, name, email, startDate, expiryDate: expiry, status: 'active' });
    await member.save();
    res.json(member);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateMembership = async (req, res) => {
  try {
    const { membershipNumber, action, extendMonths } = req.body; // action: 'extend' or 'cancel'
    const member = await Member.findOne({ membershipNumber });
    if (!member) return res.status(404).json({ message: 'Member not found' });
    if (action === 'cancel') {
      member.status = 'cancelled';
    } else if (action === 'extend') {
      const months = extendMonths || 6;
      const expiry = new Date(member.expiryDate);
      expiry.setMonth(expiry.getMonth() + Number(months));
      member.expiryDate = expiry;
    } else {
      return res.status(400).json({ message: 'Invalid action' });
    }
    await member.save();
    res.json(member);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMemberByNumber = async (req, res) => {
  try {
    const { membershipNumber } = req.params;
    const member = await Member.findOne({ membershipNumber });
    if (!member) return res.status(404).json({ message: 'Member not found' });
    res.json(member);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

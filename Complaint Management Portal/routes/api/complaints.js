const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Complaint Model
const Complaint = require('../../models/Complaint');

// @route GET api/complaints
// @desc Get All Complaints --> for admin
// @access Public
router.get('/', auth, (req, res) => {
    Complaint.find()
        .sort({ date: -1 })
        .then(complaint => res.json(complaint));
});

// @route GET api/complaints/user/:id
// @desc get complaint by id 
// @access Public
router.get('/user/:id', auth, (req, res) => {
    Complaint.find({ user: req.params.id })
        .then(complaint => {
            if (!complaint) return res.status(400).json({ msg: 'Complaint is not exists' });
            res.json(complaint);
        });
});

// @route GET api/complaints/:id
// @desc get complaint by id 
// @access Public
router.get('/:id', auth, (req, res) => {
    Complaint.findById(req.params.id)
        .then(complaint => {
            if (!complaint) return res.status(400).json({ msg: 'Complaint is not exists' });
            res.json(complaint);
        });
});

// @route POST api/complaints
// @desc Create A Complaint
// @access Public
router.post('/', auth, (req, res) => {
    const { firstName, lastName, phoneNumber, email, user, location, occupation, existingCustomer, message } = req.body;

    // simple validation
    if (!firstName || !lastName || !email || !phoneNumber || !user || !location || !occupation || !existingCustomer || !message) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    const newComplaint = new Complaint({
        firstName, lastName, email, phoneNumber, user, location, occupation, existingCustomer, message
    });

    newComplaint.save().then(complaint => res.json(complaint));
});

// @route PUT api/complaints/:id?action={accept/reject}
// @desc Update the the status for the Complaint
// @access Public
router.put('/:id', (req, res) => {
    const { action } = req.query;
    Complaint.findById(req.params.id)
        .then(complaint => {
            if (!complaint) return res.status(400).json({ msg: 'Complaint is not exists' });
            complaint.status = action;
            complaint.save().then(complaint => res.json(complaint));
        });
});

module.exports = router;

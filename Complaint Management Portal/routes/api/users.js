const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const router = express.Router();

// User Model
const User = require('../../models/User');

// @route POST api/users
// @desc Register new user
// @access Public
router.post('/', (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;
    console.log("Tareq", role);

    // simple validation
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing user
    User.findOne({ email }).then(user => {
        if (user) return res.status(400).json({ msg: 'User already exists' });

        const newUser = new User({
            firstName, lastName, email, password, role
        });

        // Create salt & hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save()
                    .then(user => {
                        jwt.sign(
                            { id: user.id },
                            config.get('jwtSecret'),
                            { expiresIn: 3600 },
                            (err, token) => {
                                if (err) throw err;
                                res.json({ token, user });
                            }
                        );
                    });
            })
        })
    })
});

module.exports = router;

const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('../schemas/user-model');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            res.status(200).json({ message: 'You have Successfully Login.', data: user });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/', async (req, res) => {
    try {
        const { email, password, username, shippingAddress, role } = req.body;

        if (!email || !password || !username) {
            return res.status(400).json({ message: 'Email, password, and username are required' });
        }

        let user = await UserModel.findOne({username });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            _id: new mongoose.Types.ObjectId(),
            email,
            password: hashedPassword,
            username,
            shippingAddress,
            role: role || 'user'
        });

        const addedUser = await newUser.save();
        res.status(201).json(addedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET single User by its ID.
router.get("/:id", async function (req, res) {
    try {
        const currUser = await UserModel.findById(req.params.id);
        if (!currUser) return res.status(404).json({ message: 'User Not Found' });
        res.status(200).json(currUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete User 
router.delete("/:id", async function (req, res) {
    try {
        const currUser = await UserModel.findByIdAndDelete(req.params.id);
        if (!currUser) return res.status(404).json({ message: 'User Not Found' });
        res.status(200).json("User Deleted Successfully");
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;

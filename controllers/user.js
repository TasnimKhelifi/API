const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

exports.createUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email.toLowerCase() })
        if (user) {
            res.status(409).json({ message: "user already exists" })
        } else {
            const hashedPass = await bcrypt.hash(req.body.password, 11)
            const userId = mongoose.Types.ObjectId()
            const createdUser = await User.create({ ...req.body, _id: userId, password: hashedPass })
            res.status(200).json({ user: createdUser });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email.toLowerCase() }).exec()
        if (user) {
            const result = await bcrypt.compare(req.body.password, user.password)
            if (result) {
                const payload = { _id: user._id, email: user.email }
                const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
                    expiresIn: "1h",
                });
                res.status(200).json({ accessToken });
            } else {
                res.status(400).json("Auth failed");
            }
        } else {
            res.status(400).json("Auth failed");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

exports.getConnectedUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id })
            .exec()
        res.status(200).json({ connectedUser: user })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });

    }
}

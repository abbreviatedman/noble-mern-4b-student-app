const bcrypt = require('bcrypt');

const User = require('../models/userModel');

const createUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        // or the naive version:
        // const username = req.body.username;
        // const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = {
            username: username,
            password: hashedPassword,
        };

        const createdUser = await User.create(user);
        res.status(201).json({
            message: 'success',
            payload: createdUser,
        })
    } catch (error) {
        const packet = {
            message: 'failure creating user',
            payload: error,
        };

        console.log(packet);
        res.status(500).json({
            message: 'failure creating user',
            payload: error,
        });
    }
}

const getUsers = async (_, res) => {
    try {
        const users = await User.find({});
        res.json({
            message: 'success',
            payload: users,
        });
    } catch (error) {
        const packet = {
            message: 'failure getting users',
            payload: error
        };

        console.log(packet);
        res.status(500).json(packet)
    }
}

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        // or the naive version:
        // const username = req.body.username;
        // const password = req.body.password;
        const user = await User.findOne({ username: username });
        console.log(user)
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        
        if (isCorrectPassword) {
            res.status(200).json({
                message: 'success',
                payload: 'logged in',
            });
        } else {
            res.status(200).json({
                message: 'success',
                payload: 'incorrect password',
            });
        }
    } catch (error) {
        const packet = {
            message: 'failure',
            payload: error,
        };

        console.log(packet);
        res.status(500).json(packet);
    }
}

const updatePassword = async (req, res) => {
    // get the username, current password, and new password from the req.body
    const { username, currentPassword, newPassword } = req.body;
    // find the user with that username
    const user = await User.findOne({username: username})
    // check if the current password is correct
    const isCorrectPassword = await bcrypt.compare(currentPassword, user.password);
    // check if the new password is the same as the current
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    // if the new password is the same, send a response about that
    if (isSamePassword) {
        res.status(200).json({
            message: 'success',
            payload: 'New password same as old.',
        });
        
        return;
    }
    
    // otherwise, if the current password is correct, change the password
    if (isCorrectPassword) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({
            message: 'success',
            payload: 'password updated',
        });

        return;
    }

    // otherwise otherwise, send a response about that
    res.status(200).json({
        message: 'success',
        payload: 'incorrect password'
    })
}

module.exports = {
    createUser,
    getUsers,
    loginUser,
    updatePassword,
};
const express = require('express');

const {
    createUser,
    getUsers,
    loginUser,
    updatePassword,
} = require('../controllers/usersController');

const router = express.Router();

// POST /api/users
router.post('/', createUser);
// GET /api/users
router.get('/', getUsers);
// POST /api/users/login
router.post('/login', loginUser);
// PATCH /api/users/password
router.patch('/password', updatePassword);

module.exports = router;
const express = require('express');
const { loginController, registerController } = require('../controllers/userController');

// router object
const router = express.Router();
// router
// POST || login
router.post('/login', loginController);

// POST || login
router.post('/register', registerController);

module.exports = router;
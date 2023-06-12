const express = require('express');
const router = express.Router();

// controller
const authController = require('./../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/testForProtect', authController.protect);
router.post('/updatePassword', authController.protect, authController.updatePassword)

module.exports = router;
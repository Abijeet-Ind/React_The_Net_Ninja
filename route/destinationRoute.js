const express = require('express');
const router = express.Router();

// controller
const authController = require('./../controllers/authController');
const destinationController = require('./../controllers/destinationController');
// const pageRender = require('./../controllers/pageRender');

router.post('/create', authController.isLoggedIn, destinationController.createDestination)
module.exports = router;
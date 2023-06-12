const express = require('express');
const router = express.Router();

// controller
const pageRender = require('./../controllers/pageRender');
const authController = require('./../controllers/authController');

router.get('/login', pageRender.login)
router.get('/signup', pageRender.signup);

router.get('/:slug/book', authController.isLoggedIn, pageRender.bookDestination);

router.get('/', pageRender.home)
router.get('/:slug', pageRender.getDestination);

module.exports = router;
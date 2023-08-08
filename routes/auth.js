const express = require('express');

const router = express.Router();

const validator = require('../middlewares/validateAuth');

const authController = require('../controllers/AuthController');

router.route('/register').post(validator.registerUser, authController.registerUser);
router.route('/login').post(validator.loginUser, authController.login, authController.getTokenAfterLogin);

module.exports = router;

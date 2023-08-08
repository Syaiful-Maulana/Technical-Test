const express = require('express');

const router = express.Router();
const profile = require('../controllers/ProfileController');

// profile
router.route('/me').get(profile.getMyProfile);

module.exports = router;

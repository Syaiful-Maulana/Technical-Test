const express = require('express');

const router = express.Router();
const authRouter = require('./auth');
const profileRouter = require('./profile');
const validateToken = require('../middlewares/validateToken');

// welcome
router.get('/', (req, res) => {
  res.respondGet(null, 'welcome to new app');
});

// dokumentasi
router.get('/dokumentasi', function (req, res) {
  res.redirect('https://documenter.getpostman.com/view/13146980/2s9XxzvD8y');
});

// Authentication
router.use('/', authRouter);

// protected
router.use(validateToken);

// profile
router.use('/', profileRouter);

module.exports = router;

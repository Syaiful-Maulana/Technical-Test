const express = require('express');

const router = express.Router();
const authRouter = require('./auth');
const profileRouter = require('./profile');
const validateToken = require('../middlewares/validateToken');

// welcome
router.get('/', (req, res) => {
  res.respondGet(null, 'welcome to new app');
});

// Authentication
router.use('/', authRouter);

// protected
router.use(validateToken);

// profile
router.use('/', profileRouter);

module.exports = router;

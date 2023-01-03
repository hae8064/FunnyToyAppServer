const express = require('express');
const { User, Board } = require('../models');

const router = express.Router();

router.post('/create', (req, res, next) => {
  try {
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

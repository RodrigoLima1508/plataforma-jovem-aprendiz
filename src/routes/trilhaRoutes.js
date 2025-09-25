// src/routes/trilhaRoutes.js

const express = require('express');
const router = express.Router();
const { createTrilha, getTrilhas } = require('../controllers/trilhaController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .post(protect, createTrilha)
  .get(protect, getTrilhas);

module.exports = router;
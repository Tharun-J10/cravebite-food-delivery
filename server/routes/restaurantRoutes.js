const express = require('express');
const router = express.Router();
const { createRestaurant, getNearbyRestaurants } = require('../controllers/restaurantController');

// Routes-ai controller functions kooda connect panrom
router.post('/add', createRestaurant);
router.get('/nearby', getNearbyRestaurants);

module.exports = router;
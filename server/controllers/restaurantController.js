const Restaurant = require('../models/Restaurant');

// 1. Puthu Restaurant-ai Create Panrathu
exports.createRestaurant = async (req, res) => {
  try {
    const { name, description, address, lng, lat, cuisine } = req.body;

    const newRestaurant = new Restaurant({
      name,
      description,
      address,
      location: {
        type: 'Point',
        coordinates: [lng, lat] // MongoDB-la eppovum Longitude thaan first varanum
      },
      cuisine
    });

    await newRestaurant.save();
    res.status(201).json({ success: true, data: newRestaurant });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 2. User Location-kku pakkathula irukkara Restaurants-ai Thedurathu
exports.getNearbyRestaurants = async (req, res) => {
  try {
    const { lng, lat, distance = 5000 } = req.query; // Default-ah 5km radius

    if (!lng || !lat) {
      return res.status(400).json({ success: false, error: "Longitude and Latitude are required" });
    }

    const restaurants = await Restaurant.find({
      location: {
        $near: {
          $maxDistance: parseInt(distance),
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)]
          }
        }
      }
    });

    res.status(200).json({ success: true, count: restaurants.length, data: restaurants });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
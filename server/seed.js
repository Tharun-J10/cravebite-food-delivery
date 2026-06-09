const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const restaurantSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  cuisine: [String],
  address: String,
  image: String,
  costForTwo: Number,
  deliveryTime: String, // Puthu dynamic timing field
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number]
  }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

const data = [
  { name: "Saravana Bhavan", rating: 4.5, cuisine: ["South Indian", "Veg"], address: "Five Roads, Salem", image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=800&q=80", costForTwo: 350, deliveryTime: "20-25 mins", location: { coordinates: [78.14, 11.66] } },
  { name: "Salem RR Biriyani", rating: 4.8, cuisine: ["Biriyani", "Non-Veg"], address: "New Bus Stand, Salem", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80", costForTwo: 500, deliveryTime: "15-20 mins", location: { coordinates: [78.14, 11.66] } },
  { name: "Mangaluru Bonda Shop", rating: 4.6, cuisine: ["Snacks", "Tea"], address: "Bazaar Street, Salem", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80", costForTwo: 150, deliveryTime: "10-15 mins", location: { coordinates: [78.14, 11.66] } },
  { name: "The Cascade", rating: 4.3, cuisine: ["Chinese", "Asian"], address: "Fairlands, Salem", image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&q=80", costForTwo: 800, deliveryTime: "35-40 mins", location: { coordinates: [78.14, 11.66] } },
  { name: "Barbeque Nation", rating: 4.7, cuisine: ["Grill", "North Indian"], address: "Reliance Mall, Salem", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80", costForTwo: 1600, deliveryTime: "45-50 mins", location: { coordinates: [78.14, 11.66] } },
  { name: "Domino's Pizza", rating: 4.1, cuisine: ["Pizza", "Fast Food"], address: "Omalur Main Road, Salem", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80", costForTwo: 400, deliveryTime: "30 mins", location: { coordinates: [78.14, 11.66] } },
  { name: "Anjappar Chettinad", rating: 4.4, cuisine: ["Chettinad", "Non-Veg"], address: "Meyyanur, Salem", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80", costForTwo: 600, deliveryTime: "25-30 mins", location: { coordinates: [78.14, 11.66] } },
  { name: "KFC", rating: 4.0, cuisine: ["Burger", "American"], address: "Suramangalam, Salem", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80", costForTwo: 450, deliveryTime: "20-30 mins", location: { coordinates: [78.14, 11.66] } },
  { name: "A2B - Adyar Ananda Bhavan", rating: 4.3, cuisine: ["Sweets", "South Indian"], address: "Kandampatti, Salem", image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&q=80", costForTwo: 300, deliveryTime: "15-25 mins", location: { coordinates: [78.14, 11.66] } },
  { name: "Kava Grill & Lounge", rating: 4.6, cuisine: ["Continental", "Desserts"], address: "Hasthampatti, Salem", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", costForTwo: 1200, deliveryTime: "40-45 mins", location: { coordinates: [78.14, 11.66] } }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/food-delivery')
  .then(async () => {
    await Restaurant.deleteMany({});
    await Restaurant.insertMany(data);
    console.log("✅ 10 Restaurants Seeded Successfully with Dynamic Delivery Times!");
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
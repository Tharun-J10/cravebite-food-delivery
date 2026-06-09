const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const restaurantRoutes = require('./routes/restaurantRoutes');

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // Frontend URL-ai explicit-ah allow panrom
  methods: ["GET", "POST"],
  credentials: true
}));
// Idhu thaan correct-ana routing
app.use('/api/restaurants', restaurantRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully! 🚀"))
  .catch((err) => console.log("MongoDB Connection Error: ", err));

// --- API ROUTES ---
app.use('/api/restaurants', restaurantRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
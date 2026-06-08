const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  address: { type: String, required: true },
  
  // Idhu thaan GeoJSON Location Logic!
  location: {
    type: {
      type: String,
      enum: ['Point'], // 'Point' format thaan location-kku use pannuvom
      required: true
    },
    coordinates: {
      type: [Number], // [longitude, latitude] - intha order romba mukkiyam!
      required: true
    }
  },
  
  cuisine: [{ type: String }], // Ex: ["South Indian", "Chinese"]
  rating: { type: Number, default: 0 },
  merchantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Restaurant owner-oda link
  createdAt: { type: Date, default: Date.now }
});

// Geospatial search fast-ah irukka intha '2dsphere' index romba mukkiyam
restaurantSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Restaurant', restaurantSchema);
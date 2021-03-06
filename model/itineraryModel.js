const mongoose = require("mongoose");
const itinerarySchema = new mongoose.Schema({
  city_id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  img: {
    type: String
  },
  rating: {
    type: String
  },
  duration: {
    type: String
  },
  price: {
    type: String
  },
  hashtags: {
    type: String
  },
  order: {
    type: Number
  },
  activities: {
    type: Array
  },
  favourites: {
    type: Array
  }
});

module.exports = mongoose.model("itineraries", itinerarySchema);

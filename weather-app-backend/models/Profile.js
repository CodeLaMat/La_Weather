const mongoose = require("mongoose");

const FavoriteCitySchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  country: { type: String, required: true },
  coords: {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
  },
});

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: "",
  },
  location: {
    city: String,
    country: String,
    coords: [Number],
  },
  notifications: [
    {
      message: String,
      date: Date,
      read: {
        type: Boolean,
        default: false,
      },
    },
  ],
  favoriteCities: { type: [FavoriteCitySchema], default: [] },
});

module.exports = mongoose.model("Profile", profileSchema);

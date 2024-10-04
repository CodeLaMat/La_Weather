const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { jwtSecret } = require("../config/config");
const router = express.Router();

// Middleware to verify token
const auth = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.userId = decoded.userId;
    next();
  });
};

const addCity = async (req, res) => {
  const { city } = req.body;
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.favoriteCities.includes(city)) {
      return res.status(400).json({ message: "City is already in favorites" });
    }

    user.favoriteCities.push(city);
    await user.save();
    res.status(200).json({ message: "City added to favorites" });
  } catch (error) {
    res.status(500).json({ message: "Error adding city to favorites" });
  }
};

const remove = async (req, res) => {
  const { city } = req.body;
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.favoriteCities = user.favoriteCities.filter(
      (favCity) => favCity !== city
    );
    await user.save();
    res.status(200).json({ message: "City removed from favorites" });
  } catch (error) {
    res.status(500).json({ message: "Error removing city from favorites" });
  }
};

const getCity = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ favoriteCities: user.favoriteCities });
  } catch (error) {
    res.status(500).json({ message: "Error fetching favorite cities" });
  }
};

module.exports = {
  addCity,
  remove,
  getCity,
};

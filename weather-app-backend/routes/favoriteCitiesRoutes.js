import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
const router = express.Router();

// Middleware to verify token
const auth = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.userId = decoded.userId;
    next();
  });
};

router.post("/add", auth, async (req, res) => {
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
});

router.post("/remove", auth, async (req, res) => {
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
});

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ favoriteCities: user.favoriteCities });
  } catch (error) {
    res.status(500).json({ message: "Error fetching favorite cities" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/auth");
const {
  addFavoriteCity,
  removeCity,
  getFavoriteCities,
} = require("../controllers/favoriteCitiesController");

router.post("/add", authenticate, addFavoriteCity);
router.post("/remove", authenticate, removeCity);
router.post("/", authenticate, getFavoriteCities);

module.exports = router;

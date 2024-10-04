const express = require("express");
const router = express.Router();
const favorites = require("../controllers/favoriteCitiesController");

// Register Route
//POST api/favorites
router.post("/add", favorites.addCity);

// Remove Route
router.delete("/remove", favorites.remove);

// GET Route
router.get("/", favorites.getCity);

module.exports = router;

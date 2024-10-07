const Profile = require("../models/Profile");

const addFavoriteCity = async (req, res) => {
  const userId = req.userId;
  const { city } = req.body;

  if (!userId || !city) {
    return res
      .status(400)
      .json({ message: "User ID and city data are required" });
  }

  try {
    const userProfile = await Profile.findOne({ user: userId });
    if (!userProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const existingCity = userProfile.favoriteCities.find(
      (favCity) => favCity.id === city.id
    );

    if (existingCity) {
      return res.status(400).json({ message: "City is already a favorite" });
    }

    userProfile.favoriteCities = [...userProfile.favoriteCities, city];
    await userProfile.save();

    res.status(201).json({ city });
    console.log(userProfile.favoriteCities);
  } catch (error) {
    console.error("Error adding favorite city:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const removeCity = async (req, res) => {
  const userId = req.userId;
  const { cityId } = req.body;

  if (!userId || !cityId) {
    return res
      .status(400)
      .json({ message: "User ID and city ID are required" });
  }

  try {
    const profile = await Profile.findOne({ user: userId });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const initialLength = profile.favoriteCities.length;
    profile.favoriteCities = profile.favoriteCities.filter(
      (favCity) => favCity.id !== cityId
    );

    if (profile.favoriteCities.length === initialLength) {
      return res.status(404).json({ message: "City not found in favorites" });
    }

    await profile.save();
    res.status(200).json({ message: "City removed from favorites" });
  } catch (error) {
    console.error("Error removing city from favorites:", error);
    res.status(500).json({ message: "Error removing city from favorites" });
  }
};

const getFavoriteCities = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const profile = await Profile.findOne({ user: userId }).select(
      "favoriteCities"
    );
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ favoriteCities: profile.favoriteCities });
    console.log(profile.favoriteCities);
  } catch (error) {
    console.error("Error fetching favorite cities:", error);
    res.status(500).json({ message: "Error fetching favorite cities" });
  }
};

module.exports = {
  addFavoriteCity,
  removeCity,
  getFavoriteCities,
};

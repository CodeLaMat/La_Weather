const mongoose = require("mongoose");
const Profile = require("../models/Profile");
require("dotenv").config();

const initializeFavoriteCities = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    const profiles = await Profile.find({ favoriteCities: { $exists: false } });

    for (const profile of profiles) {
      profile.favoriteCities = [];
      await profile.save();
      console.log(
        `Initialized favoriteCities for profile with user ID: ${profile.user}`
      );
    }

    console.log("Initialization complete");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error initializing favoriteCities:", error);
    mongoose.connection.close();
    process.exit(1);
  }
};

initializeFavoriteCities();

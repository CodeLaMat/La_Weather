const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET || "defaultSecret",
  mongoURI: process.env.MONGO_URI,
  port: process.env.PORT || 5000,
};

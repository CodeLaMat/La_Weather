const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET || "defaultSecret",
  mongoURI: process.env.MONGO_URI,
  port: process.env.PORT || 5000,
};

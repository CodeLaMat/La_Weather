const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const { jwtSecret } = require("../config/config");
const User = require("../models/User");

const clientId = process.env.GOOGLE_CLIENT_ID || "";
const oauthClient = new OAuth2Client(clientId);

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authentication header missing" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authentication token missing" });
  }

  try {
    if (token.startsWith("ya29.")) {
      // This is a Google access token.
      const response = await oauthClient.getTokenInfo(token);

      if (!response || !response.sub) {
        throw new Error("Invalid Google access token");
      }
      const user = await User.findOne({ email: response.email });
      if (!user) {
        throw new Error("User not found in the database");
      }

      req.userId = user._id;
      req.email = user.email;
      next();
    } else {
      // Handle a JWT from backend
      const decoded = jwt.verify(token, jwtSecret);
      req.userId = decoded.userId;
      next();
    }
  } catch (error) {
    console.error("Authentication error:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authenticate;

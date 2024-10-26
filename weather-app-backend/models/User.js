const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hashPassword: {
    type: String,
    required: function () {
      return !this.oauthProvider;
    },
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    default: "https://api.dicebear.com/9.x/glass/svg?seed=Maria",
  },
  resetPasswordToken: {
    type: String,
    default: null,
  },
  resetPasswordExpires: {
    type: Date,
    default: null,
  },
  oauthProvider: {
    type: String,
    enum: ["google", "facebook", "github"],
    default: null,
  },
});

module.exports = mongoose.model("User", userSchema);

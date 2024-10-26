const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const Profile = require("../models/Profile");
const { jwtSecret } = require("../config/config");
const transporter = require("../config/transporter");

const register = async (req, res) => {
  const { name, surname, email, password } = req.body;

  if (!name || !surname || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name: `${name} ${surname}`,
      email,
      hashPassword: hashedPassword,
      username: email,
    };

    const newUser = new User(userData);
    await newUser.save();

    const newProfile = new Profile({
      user: newUser._id,
      email: newUser.email,
      bio: "",
      location: { city: "", country: "", coords: 0 },
      notifications: [],
      favoriteCities: [],
    });

    await newProfile.save();

    newUser.profile = newProfile._id;
    await newUser.save();

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "You have successfully registered",
      html: `
        <p>Dear ${name},</p>
        <p>You have been registered on the LaWeather platform.</p>
        <p>Thank you for registering with us.</p>
        <p>Best regards,</p>
        <p>LaWeather Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid credentials: user not found" });
    }
    const isMatch = await bcrypt.compare(password, user.hashPassword);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid credentials: password mismatch" });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: "1h",
    });
    res.status(200).json({
      token,
      userId: user._id,
      email: user.email,
      name: user.name,
      image: user.image,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error logging in" });
  }
};

const logout = (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({
        message: "A user with this email does not exist.",
      });
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <p>You requested a password reset for your LaWeather account.</p>
        <p>Please click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>This link will expire in 1 hour.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message:
        "If an account with that email exists, a reset link has been sent.",
    });
  } catch (error) {
    console.error("Error in request-password-reset:", error);
    res.status(500).json({ message: "Server error." });
  }
};

const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    if (!token || !password) {
      return res
        .status(400)
        .json({ message: "Token and password are required." });
    }

    const resetTokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: resetTokenHash,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired password reset token." });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    user.hashPassword = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: "Password Successfully Reset",
      html: `
        <p>Your password has been successfully reset.</p>
        <p>If you did not perform this action, please contact support immediately.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password has been reset successfully." });
  } catch (error) {
    console.error("Error in reset-password:", error);
    res.status(500).json({ message: "Server error." });
  }
};

const createGoogleUser = async (req, res) => {
  const { email, name, image } = req.body;

  if (!email || !name) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name,
        email,
        image,
        username: email,
        oauthProvider: "google",
      });

      await user.save();

      const profile = new Profile({
        user: user._id,
        email: user.email,
        bio: "",
        location: { city: "", country: "", coords: 0 },
        notifications: [],
        favoriteCities: [],
      });

      await profile.save();
      user.profile = profile._id;
      await user.save();
    }

    res
      .status(200)
      .json({ userId: user._id, email, name: user.name, image: user.image });
  } catch (error) {
    console.error("Error creating Google user:", error);
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  requestPasswordReset,
  resetPassword,
  createGoogleUser,
};

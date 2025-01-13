// backend/routes/auth.js
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { verifyToken } = require("../middleware/verifyToken");
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.get("/verify-token", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.password = undefined;
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "User already exists" });

    const newUser = await User.create({ username, email, password });
    newUser.password = undefined;
    const token = jwt.sign({ _id: newUser._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({ token, user: newUser });

    // return res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    return res.status(400).json({ error: "Error registering user" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ error: "Invalid email or password" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({ error: "Invalid email or password" });

  user.password = undefined;
  const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "1h" });
  return res.json({ token, user });
});

module.exports = router;

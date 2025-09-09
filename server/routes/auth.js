// server/routes/auth.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone, address, city } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    // Check existing
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already in use" });

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10); // 10 salt rounds

    const user = new User({ name, email, passwordHash, phone, address, city });
    await user.save();

    // Create JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Optionally set an httpOnly cookie (safer); commented out by default
    // res.cookie("token", token, { httpOnly: true, sameSite: "lax", secure: false, maxAge: 24*60*60*1000 });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone, address: user.address, city: user.city }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Optionally set cookie:
    // res.cookie("token", token, { httpOnly: true, sameSite: "lax", secure: false });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone, address: user.address, city: user.city }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
// GET /api/profile
router.get("/profile", auth, async (req, res) => {
  try {
    // req.userId comes from middleware
    const user = await User.findById(req.userId).select("-passwordHash");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

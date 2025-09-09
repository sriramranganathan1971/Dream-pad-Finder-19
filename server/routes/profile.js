// server/routes/profile.js
import express from "express";
import User from "../models/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-passwordHash");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

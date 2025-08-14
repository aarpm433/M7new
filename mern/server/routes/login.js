import express from "express";
import User from "../db/Schemas/UserSchema.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (user) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
});

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    const user = new User({ first_name, last_name, email, password });
    await user.save();
    res.status(201).json({ message: "User created!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


export default router;
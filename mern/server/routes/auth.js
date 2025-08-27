import express from "express";
import User from "../db/Schemas/UserSchema.js";
import Session from "../db/Schemas/SessionSchema.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// Login with email and password
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (user) {
    res.status(200).json({ status: "ok", data: { userId: user._id}, message: "Login successful" });
  } else {
    res.status(401).json({ status: "error", message: "Unauthorized" });
  }
});

// Register a new user
router.post("/register", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    const user = new User({ first_name, last_name, email, password });
    await user.save();
    res.status(201).json({ status: "ok", message: "User created!" });
  } catch (err) {
    res.status(400).json({ status: "error", error: err.message });
  }
});

// Create a session for the user
router.post("/session/:userID", async (req, res) => {
  const { userID } = req.params;
  const token = uuidv4();

  try {
    const session = new Session({ userID, token });
    await session.save();

    res.status(201).json({
      status: "ok",
      data: { token },
      message: "Session saved successfully",
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});


// Validate a session token
router.get("/validate_token", async (req, res) => {
  const { token } = req.query;
  if (!token)
    return res.status(400).json({ status: "error", message: "Missing token" });

  const session = await Session.findOne({ token }).populate("userID");
  if (!session)
    return res.status(404).json({ status: "ok", data: { valid: false, user: null }, message: null });
  console.log("Session validated:", session);

  res.status(200).json({
    status: "ok",
    data: {
      valid: true,
      user: {
        first_name: session.userID.first_name,
        last_name: session.userID.last_name,
        id: session.userID._id,
      },
    },
    message: null,
  });
});

export default router;

import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/userModel.js";
import { Profile } from "../models/profileModel.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
dotenv.config();
const jwtSecretKey = process.env.KEY;

router.post("/signup", async (req, res) => {
  const { name, email, password, confirm_password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
      confirm_password,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, jwtSecretKey, {
      expiresIn: "1h",
    });

    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecretKey, {
      expiresIn: "1h",
    });
    console.log("Token:", token); // Add this line for debugging
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/profile", authMiddleware, async (req, res) => {
  const { age, gender, mobileNumber, dob } = req.body;

  try {
    const existingProfile = await Profile.findOne({ user: req.userId });

    if (existingProfile) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    const profileUser = new Profile({
      userId: req.userId,
      age,
      gender,
      mobileNumber,
      dob,
    });

    await profileUser.save();
    return res.json({ status: true, message: "Profile created" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export { router as UserRouter };

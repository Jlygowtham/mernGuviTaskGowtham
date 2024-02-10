// authMiddleware.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/userModel.js";

dotenv.config();
const jwtSecretKey = process.env.KEY;

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    req.userId = decoded.userId;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

export default authMiddleware;

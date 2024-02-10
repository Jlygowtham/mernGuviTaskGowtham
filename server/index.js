import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { UserRouter } from "./routes/userRoute.js";
import cors from "cors";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log("Server is Running");
});

app.use("/auth", UserRouter);

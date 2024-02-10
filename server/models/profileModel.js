import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  dob: { type: Date, required: true },
});

const profileModel = mongoose.model("Profile", profileSchema);

export { profileModel as Profile };

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      sparse: true,
    },
    password: { type: String },
    address: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      postalCode: {
        type: String,
        minLength: 5, // Example of a custom validator
      },
    },
    phone: { type: Number },
    bio: String,
    url: String,
    profilePhoto: String,
    status: { type: String, enum: ["online", "offline"] },
    role: {
      type: String,
      enum: ["user", "provider", "admin"],
      default: "user",
    },
    resetToken: { type: String, default: undefined },
    resetTokenExpire: { type: Date, default: undefined },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);

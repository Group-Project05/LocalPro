const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, trim: true },
  category: String,
  description: String,
  experience: String,
  images: String,
  price: {
    chargeType: { type: String },
    amount: { type: String },
  },
  location: {
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
},{timestamps: true});

module.exports = mongoose.model("Service",serviceSchema);

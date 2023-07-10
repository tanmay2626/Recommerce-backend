const mongoose = require("mongoose");

const ScrapyarSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
    trim: true,
  },
  tagline: {
    type: String,
  },
  category: {
    type: String,
    enum: [
      "Car",
      "Mobile",
      "Laptop",
      "Furniture",
      "Electronic",
      "Garden",
      "Fashion",
      "Sports",
      "Other",
    ],
  },
  usage: {
    type: String,
  },
  image: {
    type: String,
  },
  brand: {
    type: String,
  },
  price: {
    type: Number,
  },
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CreativeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  tagline: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "Painting",
      "Home Decor",
      "Jwelleries",
      "Arts",
      "Accessories",
      "LifeStyle-Men",
      "LifeStyle-Women",
      "Other",
    ],
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Scrapyar = mongoose.model("Scrapyar", ScrapyarSchema);
const CreativeScrapyar = mongoose.model("Creative-Scrapyar", CreativeSchema);

module.exports = { Scrapyar, CreativeScrapyar };

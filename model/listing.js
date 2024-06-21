const mongoose = require("mongoose");
const manyData = require("../init/data.js");
const comment = require("./comment.js");
const { string } = require("joi");

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  description: {
    type: String,
    lowercase: true,
  },
  image: {
    url: String,
    filename: String,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
    lowercase: true,
  },
  country: {
    type: String,
    lowercase: true,
  },
  category: {
    type: String,
    lowercase: true,
    enum: [
      "home",
      "desert",
      "lake",
      "camping",
      "nationalPark",
      "trending",
      "lakeFort",
      "farms",
      "island",
      "treeHouse",
      "beach",
      "beschFront",
      "tropical",
      "cave",
      "domes",
      "towers",
      "houseboat",
    ],
    default: "trending",
    required: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await comment.deleteMany({ _id: { $id: listing.comment } });
  }
});

const listing = new mongoose.model("listing", listingSchema);

module.exports = listing;

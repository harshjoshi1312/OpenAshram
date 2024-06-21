const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  comments: {
    type: String,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const comment = new mongoose.model("comment", commentSchema);

module.exports = comment;

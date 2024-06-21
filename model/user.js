const mongoose = require("mongoose");
const passMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
});

userSchema.plugin(passMongoose);

module.exports = mongoose.model("user", userSchema);

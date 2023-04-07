const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must have a name"],
  },
  email: {
    type: String,
    required: [true, "User must have a email"],
    unique: true,
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: { type: String, minLength: 2, maxLength: 32, required: true },
  lastName: { type: String, minLength: 2, maxLength: 32, required: true },
  username: {
    type: String,
    minLength: 2,
    maxLength: 32,
    required: true,
    unique: true,
  },
  password: { type: String, minLength: 5, required: true },
  imageUrl: { type: String, default: "images/profiles/user.png" },
  createdAt: { type: Date, default: Date.now() },
});

const User = mongoose.model("User", userSchema);
module.exports = User;

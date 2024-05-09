const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: { type: String, minLength: 2, maxLength: 32, required: true },
  lastName: { type: String, minLength: 2, maxLength: 32, required: true },
  userName: {
    type: String,
    minLength: 2,
    maxLength: 32,
    required: true,
    unique: true,
  },
  password: { type: String, minLength: 5, required: true },
  role: { type: String, default: "user", enum: ["user", "moderator", "admin"] },
  likedVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  videosHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  imageUrl: { type: String, default: "images/profiles/user.png" },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
module.exports = User;

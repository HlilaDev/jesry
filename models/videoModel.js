const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: { type: String, maxLegth: 100, required: true },
  description: { type: String, maxLegth: 1000 },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  section: [{ type: mongoose.Schema.Types.ObjectId, ref: "Section" }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  likes: { type: Number, default: 0 },
  tags: [{ type: String }], // Add tags field as an array of strings
  //   playlist: { type: mongoose.Schema.Types.ObjectId, ref: "Playlist" },
  url: { type: String },
  date: { type: Date, default: Date.now }, // Add date field
});

// Create the Video Model
const Video = mongoose.model("Video", videoSchema);

// Export the Video model
module.exports = Video;

const mongoose = require("mongoose");

// Define the Document Schema
const docSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  likes: { type: Number, default: 0 },
  tags: [{ type: String }], // Add tags field as an array of strings
  url: { type: String },
  date: { type: Date, default: Date.now }, // Add date field
});

// Create the Document Model
const Doc = mongoose.model("Doc", docSchema);

// Export the Document model
module.exports = Doc;

const mongoose = require("mongoose");

// Define the Document Schema
const levelSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }, // Add date field
});

// Create the Document Model
const Level = mongoose.model("Level", levelSchema);

// Export the Document model
module.exports = Level;

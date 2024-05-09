const mongoose = require("mongoose");

// Define the Quote Schema
const quoteSchema = new mongoose.Schema({
  description: { type: String, maxLength: 200 },
  author: { type: String, maxLength: 32 },
  date: { type: Date, default: Date.now }, // Add date field
});

// Create the Quote Model
const Quote = mongoose.model("Quote", quoteSchema);

// Export the Quote model
module.exports = Quote;

const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 32,
    required: true,
  },
  description: {
    type: String,
    maxLength: 1000,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;

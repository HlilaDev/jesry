const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 50,
  },
  level: {
    type: String,
    enum: ["bac", "licence", "master", "doctorat"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Section = mongoose.model("Section", sectionSchema);
module.exports = Section;

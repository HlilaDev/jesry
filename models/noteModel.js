const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: { type: String, maxLegth: 32 },
  description: { type: String, maxLength: 1000 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  color: {
    type: String,
    enum: ["bg-primary", "bg-secondary", "bg-danger", "bg-info", "bg-success"],
    default: "bg-primary",
  },
  createdAt: { type: Date, default: Date.now },
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;

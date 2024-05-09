const Note = require("../models/noteModel");
const User = require("../models/userModel");

// Create a new Note
exports.createNote = async (req, res) => {
  try {
    const newNote = new Note(req.body);
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Notes
exports.getAllNotes = async (req, res) => {
  try {
    const Notes = await Note.find();
    res.status(200).json(Notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single Note by ID
exports.getNoteById = async (req, res) => {
  try {
    const Note = await Note.findById(req.params.id);
    if (!Note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(Note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Note by ID
exports.updateNote = async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a Note by ID
exports.deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Notes by AuthorId
exports.getNoteByAuthorId = async (req, res) => {
  try {
    const authorId = req.params.id;
    const author = await User.findById(authorId);
    if (!author) {
      return res.status(404).json("user Not found");
    }

    const allNotes = await Note.find({ author: authorId });

    res.status(200).json(allNotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

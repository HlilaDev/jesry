const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");

// Route to create a new note
router.post("/add-note", noteController.createNote);

// Route to get a single note by ID
router.get("/note/:id", noteController.getNoteById);

// Route to update a note by ID
router.put("/edit-note/:id", noteController.updateNote);

// Route to delete a note by ID
router.delete("/delete-note/:id", noteController.deleteNote);

// Route to get all notes
router.get("/all-notes", noteController.getAllNotes);

//get notes by author Id
router.get("/author/:id", noteController.getNoteByAuthorId);

module.exports = router;

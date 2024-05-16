const express = require("express");
const router = express.Router();
const sectionController = require("../controllers/sectionController");

// Route to create a new section
router.post("/add-section", sectionController.addSection);

// Route to get a single section by ID
router.get("/section/:id", sectionController.getSectionById);

// Route to update a section by ID
router.put("/edit-section/:id", sectionController.updateSection);

// Route to delete a section by ID
router.delete("/delete-section/:id", sectionController.deleteSection);

// get all sections
router.get("/allsections", sectionController.allSections);

//get Section by level
router.get("/sectionsByLevel/:id", sectionController.getSectionsByLevel);

module.exports = router;

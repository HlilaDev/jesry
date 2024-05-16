const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

// Route to create a new course
router.post("/add-course", courseController.addCourse);

// Route to get a single Course by ID
router.get("/course/:id", courseController.getCourseById);

// Route to update a Course by ID
router.put("/edit-course/:id", courseController.updateCourse);

// Route to delete a Course by ID
router.delete("/delete-course/:id", courseController.deleteCourse);

// get all Courses
router.get("/allcourses", courseController.allCourses);

//get Course by level
router.get("/coursesByLevel/:id", courseController.getCoursesByLevel);

module.exports = router;

const Course = require("../models/courseModel");
const User = require("../models/userModel");
const Section = require("../models/sectionModel");

// Create a new Course
exports.addCourse = async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json("Course has been created !");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Courses
exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find();
    res.status(200).json(allCourses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single Course by ID
exports.getCourseById = async (req, res) => {
  try {
    const courseExist = await Course.findById(req.params.id);
    if (!courseExist) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(courseExist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Course by ID
exports.updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a Course by ID
exports.deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Courses by AuthorId
exports.getCourseByAuthorId = async (req, res) => {
  try {
    const authorId = req.params.id;
    const author = await User.findById(authorId);
    if (!author) {
      return res.status(404).json("user Not found");
    }

    const allCourses = await Course.find({ author: authorId });

    res.status(200).json(allCourses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get  Course by section
exports.getCoursesBySectionId = async (req, res) => {
  try {
    const sectionId = req.params.id;
    const courseExist = await Course.find({ section: sectionId });
    if (!courseExist) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(courseExist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

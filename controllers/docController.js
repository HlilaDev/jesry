const Doc = require("../models/docModel");
const Course = require("../models/courseModel");
const Section = require("../models/sectionModel");
const fs = require("fs");

//get All Docs
exports.getAllDocs = async (req, res) => {
  try {
    const allDocs = await Doc.find();
    res.status(200).json(allDocs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// add Doc
exports.addDoc = async (req, res) => {
  try {
    const newDoc = new Doc(req.body);
    if (req.file) {
      newDoc.docUrl = req.file.filename;
    }
    await newDoc.save();
    res.status(200).json("Doc was created !");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteDoc = async (req, res) => {
  try {
    const docId = req.params.id;

    //verify Doc existance
    const docExist = await Doc.findById(docId);
    if (!docExist) {
      return res.status(404).json("Doc not found !");
    }

    // delete the file from the application folder
    try {
      fs.unlinkSync(`./uploads/docs/${docExist.url}`);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleting file" });
    }

    // delete the file from the database
    await Doc.findByIdAndDelete(docExist);
    res.status(200).json("Doc deleted !");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// edit Doc
exports.editDoc = async (req, res) => {
  try {
    const docId = req.params.id;

    //verify Doc existance
    const doc = Doc.findById(docId);
    if (!doc) {
      return res.status(404).json("Doc not found !");
    }
    const newDoc = req.body;

    await Doc.findByIdAndUpdate(docId, newDoc, { new: true });
    res.status(200).json("Doc has been edited  !");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get Doc By Id
exports.getDocById = async (req, res) => {
  try {
    const docId = req.params.id;

    //verify Doc existance
    const doc = await Doc.findById(docId);
    if (!doc) {
      return res.status(404).json("Doc not found !");
    }

    res.status(200).json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//search doc By Querry
exports.searchDocsByQuerry = async (req, res) => {
  const query = req.query.q;
  try {
    const docs = await Doc.find({
      title: { $regex: query, $options: "i" },
    });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDocByCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    //verify Course existance
    const courseExist = await Course.findById(courseId);
    if (!courseExist) {
      return res.status(404).json("Course not found !");
    }
    const docsByCourse = await Doc.find({ course: courseId });

    res.status(200).json(docsByCourse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDocsBySection = async (req, res) => {
  try {
    const sectionId = req.params.id;

    //verify Section existance
    const sectionExist = await Section.findById(sectionId);
    if (!sectionExist) {
      return res.status(404).json("Section not found !");
    }
    const docsBySection = await Doc.find({ section: sectionId });

    res.status(200).json(docsBySection);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const Doc = require("../models/docModel");
const fs = require("fs");

//get All Docs
exports.getAllDocs = async (req, res) => {
  try {
    const allDocs = await Doc.find();
    res.status(200).json(allDocs);
  } catch (err) {
    res.status(500).json({ message: err });
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
    res.status(500).json({ message: err });
  }
};

exports.deleteDoc = async (req, res) => {
  try {
    const DocId = req.params.id;

    //verify Doc existance
    const docExist = await Doc.findById(DocId);
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
    res.status(500).json({ message: err });
  }
};

// edit Doc
exports.editDoc = async (req, res) => {
  try {
    const DocId = req.params.id;

    //verify Doc existance
    const Doc = Doc.findById(DocId);
    if (!Doc) {
      return res.status(404).json("Doc not found !");
    }
    const newDoc = req.body;

    await Doc.findByIdAndUpdate(DocId, newDoc, { new: true });
    res.status(200).json("Doc has been edited  !");
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// get Doc By Id
exports.getDocById = async (req, res) => {
  try {
    const DocId = req.params.id;

    //verify Doc existance
    const Doc = await Doc.findById(DocId);
    if (!Doc) {
      return res.status(404).json("Doc not found !");
    }

    res.status(200).json(Doc);
  } catch (err) {
    res.status(500).json({ message: err });
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
    res.status(500).json({ message: err });
  }
};

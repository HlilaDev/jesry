const Section = require("../models/sectionModel");

exports.addSection = async (req, res) => {
  try {
    const newSection = new Section(req.body);
    await newSection.save();
    res.status(200).json("Section hab been created !");
  } catch (err) {
    res.status(500).json({ meassage: err.meassage });
  }
};

exports.allSections = async (req, res) => {
  try {
    const allSections = await Section.find();
    res.status(200).json(allSections);
  } catch (err) {
    res.status(500).json({ meassage: err.meassage });
  }
};

exports.editSection = async (req, res) => {
  try {
    const sectionId = req.params.id;
    const sectionExist = await Section.findById(sectionId);

    if (!sectionExist) {
      return res.status(404).json("section not found !");
    }

    const updatedSection = req.body;
    await Section.findByIdAndUpdate(sectionId, updatedSection, { new: true });
    res.status(200).json("Section hab been updated !");
  } catch (err) {
    res.status(500).json({ meassage: err.meassage });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const sectionId = req.params.id;
    const sectionExist = await Section.findById(sectionId);

    if (!sectionExist) {
      return res.status(404).json("section not found !");
    }

    await Section.findByIdAndDelete(sectionId);
    res.status(200).json("Section hab been deleted !");
  } catch (err) {
    res.status(500).json({ meassage: err.meassage });
  }
};

exports.getSectionById = async (req, res) => {
  try {
    const sectionId = req.params.id;
    const sectionExist = await Section.findById(sectionId);

    if (!sectionExist) {
      return res.status(404).json("section not found !");
    }

    res.status(200).json(sectionExist);
  } catch (err) {
    res.status(500).json({ meassage: err.meassage });
  }
};

exports.getSectionsByLevel = async (req, res) => {
  try {
    const onelevel = req.params.id;
    const sections = await Section.find({ level: onelevel });

    if (!sections) {
      return res.status(404).json("sections not found !");
    }

    res.status(200).json(sections);
  } catch (err) {
    res.status(500).json({ meassage: err.meassage });
  }
};

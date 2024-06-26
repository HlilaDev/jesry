const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

const {
  getAllDocs,
  addDoc,
  deleteDoc,
  editDoc,
  getDocById,
  searchDocsByQuerry,
  getDocByCourse,
  getDocsBySection,
} = require("../controllers/docController");

router.post("/addDoc", upload("/uploads/docs").single("pdf"), addDoc);
router.get("/allDocs", getAllDocs);
router.delete("/deleteDoc/:id", deleteDoc);
router.put("/editDoc/:id", editDoc);
router.get("/doc/:id", getDocById);
router.get("/search", searchDocsByQuerry);
router.get("/docByCourse/:id", getDocByCourse);
router.get("/docBySection/:id", getDocsBySection);

module.exports = router;

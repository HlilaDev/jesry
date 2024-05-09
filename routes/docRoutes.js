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
} = require("../controllers/docController");

router.post("/addDoc", upload("/uploads/docs").single("pdf"), addDoc);
router.get("/getAllDocs", getAllDocs);
router.delete("/deleteDoc/:id", deleteDoc);
router.put("/editDoc/:id", editDoc);
router.get("/doc/:id", getDocById);
router.get("/search", searchDocsByQuerry);

module.exports = router;

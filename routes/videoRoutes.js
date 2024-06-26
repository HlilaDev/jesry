const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const {
  allVideos,
  addVideo,
  editVideo,
  deleteVideo,
  totalVideos,
  getVideoById,
  getFullVideoById,
  toggleLike,
  getVideosByCourseId,
  getVideoByPlaylist,
  searchVideoByQuerry,
} = require("../controllers/videoController");

router.get("/allVideos", allVideos);
router.get("/videosByCourseId/:id", getVideosByCourseId);
router.get("/videosBySectionId/:id", getVideosBySectionId);
router.get("/VideosByPlaylist/:id", getVideoByPlaylist);
router.post("/addVideo", upload("/uploads/videos").single("video"), addVideo);
router.put("/editVideo/:id", editVideo);
router.delete("/deleteVideo/:id", deleteVideo);
router.get("/count", totalVideos);
router.get("/video/:id", getVideoById);
router.get("/fullVideos/:id", getFullVideoById);
router.post("/toggleLike/:id", toggleLike);
router.get("/search", searchVideoByQuerry);

module.exports = router;

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
  getVideoByCategory,
  getVideoByPlaylist,
  searchVideoByQuerry,
} = require("../controllers/videoController");

router.get("/allVideos", allVideos);
router.get("/VideoByCategory/:id", getVideoByCategory);
router.get("/VideosByPlaylist/:id", getVideoByPlaylist);
router.post("/addVideo", upload("/uploads/videos").single("video"), addVideo);
router.put("/editVideo/:id", editVideo);
router.delete("/deleteVideo/:id", deleteVideo);
router.get("/videos/count", totalVideos);
router.get("/videos/:id", getVideoById);
router.get("/fullVideos/:id", getFullVideoById);
router.post("/video/:id/toggleLike", toggleLike);
router.get("/search", searchVideoByQuerry);

module.exports = router;

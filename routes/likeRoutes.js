const express = require("express");
const router = express.Router();
const { likeVideo, unlikeVideo } = require("../controllers/likeController");

router.post("/likeVideo/:id", likeVideo);
router.post("/unlikeVideo/:id", unlikeVideo);

module.exports = router;

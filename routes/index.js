const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");
const videoRoutes = require("./videoRoutes");
const playlistRoutes = require("./playlistRoutes");
const docRoutes = require("./docRoutes");
const noteRoutes = require("./noteRoutes");
const quoteRoutes = require("./quoteRoutes");

//user Middlewres
router.use("/users", userRoutes);

//video Middlewres
router.use("/videos", videoRoutes);

//playlist Middlewres
router.use("/playlists", playlistRoutes);

//doc Middlewres
router.use("/docs", docRoutes);

//note Middlewres
router.use("/notes", noteRoutes);

//quotes Middlewres
router.use("/quotes", quoteRoutes);

module.exports = router;

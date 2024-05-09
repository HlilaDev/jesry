const express = require("express");
const {
  addPlaylist,
  allPlaylists,
  editPlaylist,
  deletePlaylist,
  getPlaylistById,
  populatePlaylistById,
  allPlaylistsWithVideos,
} = require("../controllers/playlistController");
const router = express.Router();

router.post("/addPlaylist", addPlaylist);
router.get("/allPlaylists", allPlaylists);
router.get("/allPlaylistsWithVideos", allPlaylistsWithVideos);
router.put("/editPlaylist/:id", editPlaylist);
router.delete("/deletePlaylist/:id", deletePlaylist);
router.get("/playlist/:id", getPlaylistById);
router.get("/fullPlaylist/:id", populatePlaylistById);

module.exports = router;

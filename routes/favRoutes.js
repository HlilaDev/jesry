const express = require("express");
const router = express.Router();
const {
  addToFavorites,
  removeFromFavorites,
} = require("../controllers/favController");

router.post("/addToFavorites/:id", addToFavorites);
router.post("/removeFromFavorites/:id", removeFromFavorites);

module.exports = router;

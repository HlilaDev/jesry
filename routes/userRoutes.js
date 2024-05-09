const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

const {
  addUser,
  getUsers,
  getUserById,
  editUser,
  deleteUser,
  getVideoFavById,
  addToFavorites,
  removeFromFavorites,
  register,
  login,
  getRoleById,
} = require("../controllers/userController");

router.post("/addUser", upload("images/profiles").single("image"), addUser);
router.get("/users", getUsers);
router.get("/user/:id", getUserById);
router.put(
  "/editUser/:id",
  upload("images/profiles").single("image"),
  editUser
);
router.delete("/deleteUser/:id", deleteUser);
router.get("/videoFav/:id", getVideoFavById);
router.post("/addToFavorites/:userId", addToFavorites);
router.post("/removeFromFavorites/:userId", removeFromFavorites);

//Auth
router.post("/register", register);
router.post("/login", login);
router.get("/role/:id", getRoleById);

module.exports = router;

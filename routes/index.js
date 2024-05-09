const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");

//user Middlewres
router.use("/users", userRoutes);

module.exports = router;

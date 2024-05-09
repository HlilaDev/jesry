const express = require("express");
const app = express();
const userRoutes = require("./userRoutes");

//user Middlewres
app.use("/users", userRoutes);

module.exports = router;

const mongoose = require("mongoose");
require("dotenv").config();
mongoose
  .connect(process.env.DATABASEURL)
  .then(() => {
    console.log("Database is Connected !");
  })
  .catch((err) => {
    console.log("Error on Database Connection ", err);
  });

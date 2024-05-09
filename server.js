const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const port = process.env.PORT;
const apiRoutes = require("./routes");

//database Connection
require("./config/connect");

//All API's Endpoint
app.use("/api", apiRoutes);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

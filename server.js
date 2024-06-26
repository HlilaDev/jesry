const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const port = process.env.PORT;
const apiRoutes = require("./routes");
const cors = require("cors");
app.use(cors())

//database Connection
require("./config/connect");

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static("uploads"));

//All API's Endpoint
app.use("/api", apiRoutes);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

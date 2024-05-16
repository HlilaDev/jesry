const rateLimit = require("express-rate-limit");

// Define rate limiting options
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later",
});

module.exports = limiter;

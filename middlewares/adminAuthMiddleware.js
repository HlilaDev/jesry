const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const adminAuthMiddleware = async (req, res, next) => {
  try {
    // Extract the user ID from the request token
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authorization token is missing" });
    }

    // Verify the token and extract the user ID
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    // Fetch the user from the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Check if the user is an admin
    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform this action" });
    }

    // If the user is an admin, proceed to the next middleware/route handler
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = adminAuthMiddleware;

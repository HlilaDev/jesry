const Favorite = require("../models/favModel");
const Video = require("../models/videoModel");

// Add a Video to favorites
exports.addToFavorites = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.user._id; // Assuming you have middleware to extract user from JWT

    // Check if the Video is already in favorites
    const existingFavorite = await Favorite.findOne({ videoId, userId });
    if (existingFavorite) {
      return res.status(400).json({ message: "Video is already in favorites" });
    }

    // Create a new favorite
    const favorite = new Favorite({ videoId, userId });
    await favorite.save();

    // Increment the favCount in the corresponding Video
    await Video.findByIdAndUpdate(videoId, { $inc: { favCount: 1 } });

    res.status(201).json({ message: "Video added to favorites successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove a Video from favorites
exports.removeFromFavorites = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.user._id; // Assuming you have middleware to extract user from JWT

    // Check if the Video is in favorites
    const existingFavorite = await Favorite.findOne({ videoId, userId });
    if (!existingFavorite) {
      return res.status(400).json({ message: "Video is not in favorites" });
    }

    // Delete the favorite
    await Favorite.findByIdAndDelete(existingFavorite._id);

    // Decrement the favCount in the corresponding Video
    await Video.findByIdAndUpdate(videoId, { $inc: { favCount: -1 } });

    res
      .status(200)
      .json({ message: "Video removed from favorites successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

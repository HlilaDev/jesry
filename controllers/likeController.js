const Like = require("../models/likeModel");
const Video = require("../models/videoModel");

// Like a post
exports.likeVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.user._id; // Assuming you have middleware to extract user from JWT

    // Check if the user has already liked the post
    const existingLike = await Like.findOne({ videoId, userId });
    if (existingLike) {
      return res
        .status(400)
        .json({ message: "You have already liked this post" });
    }

    // Create a new like
    const like = new Like({ postId, userId });
    await like.save();

    // Increment the like count in the corresponding post
    await Video.findByIdAndUpdate(videoId, { $inc: { likes: 1 } });

    res.status(201).json({ message: "Video liked successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Unlike a post
exports.unlikeVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.user._id; // Assuming you have middleware to extract user from JWT

    // Check if the user has liked the post
    const existingLike = await Like.findOne({ videoId, userId });
    if (!existingLike) {
      return res.status(400).json({ message: "You have not liked this post" });
    }

    // Delete the like
    await Like.findByIdAndDelete(existingLike._id);

    // Decrement the like count in the corresponding post
    await Video.findByIdAndUpdate(videoId, { $inc: { likes: -1 } });

    res.status(200).json({ message: "Video unliked successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

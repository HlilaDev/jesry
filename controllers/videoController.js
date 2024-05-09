const Video = require("../models/videoModel");
const User = require("../models/userModel");
const Category = require("../models/categoryModel");
const Playlist = require("../models/playlistModel");
const fs = require("fs");

//add new Video
exports.addVideo = async (req, res) => {
  try {
    const newVideo = new Video(req.body);

    if (req.file) {
      newVideo.url = req.file.filename;
    }
    await newVideo.save();
    // Update the Category document to include the video's ID
    await Category.findOneAndUpdate(
      { title: req.body.category }, // Assuming you are using the category title for reference
      { $push: { videos: newVideo._id } },
      { new: true }
    );
    await Playlist.findOneAndUpdate(
      { title: req.body.playlist }, // Assuming you are using the playlist title for reference
      { $push: { videos: newVideo._id } },
      { new: true }
    );
    res.status(201).json("Video added Successfully !");
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

//get all videos
exports.allVideos = async (req, res) => {
  try {
    const allVideos = await Video.find();

    res.status(200).json(allVideos);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

//delete video
exports.deleteVideo = async (req, res) => {
  try {
    const videoId = req.params.id;
    //checking video
    const videoExist = await Video.findById(videoId);
    if (!videoExist) {
      return res.status(404).json("video not existed ! ");
    }

    // delete the file from the application folder
    try {
      fs.unlinkSync(`./uploads/videos/${videoExist.url}`);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleting video" });
    }

    await Video.findByIdAndDelete(videoId);
    res.status(200).json("Video Deleted");
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

//edit video
exports.editVideo = async (req, res) => {
  try {
    const videoId = req.params.id;
    //checking video
    const videoExist = await Video.findById(videoId);
    if (!videoExist) {
      res.status(404).json("video not existed ! ");
    } else {
      const newVideo = req.body;
      if (req.file) {
        newVideo.url = req.file.filename;
      }
      await Video.findByIdAndUpdate(videoId, newVideo, { new: true });
      res.status(200).json("Video edited");
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

//total video count endpoint
exports.totalVideos = async (req, res) => {
  try {
    const totalVideos = await Video.countDocuments();
    res.status(200).json(totalVideos);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while fetching the total number of videos",
    });
  }
};

//get video byId endpoint
exports.getVideoById = async (req, res) => {
  try {
    const videoId = req.params.id;
    //checking video
    const videoExist = await Video.findById(videoId);
    if (!videoExist) {
      res.status(404).json("video not existed ! ");
    } else {
      res.status(200).json(videoExist);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

//get videos by category
exports.getVideoByCategory = async (req, res) => {
  try {
    const catId = req.params.id;
    //checking video
    const categoryExist = await Category.findById(catId);

    if (!categoryExist) {
      res.status(404).json("category not existed ! ");
    } else {
      const videoByCategory = await Video.find({ category: catId });
      res.status(200).json(videoByCategory);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

//get videos by playlist
exports.getVideoByPlaylist = async (req, res) => {
  try {
    const playlistId = req.params.id;
    //checking video
    const playlistExist = await Playlist.findById(playlistId);

    if (!playlistExist) {
      res.status(404).json("playlist not existed ! ");
    } else {
      const videosByPlaylist = await Video.find({ playlist: playlistId });
      res.status(200).json(videosByPlaylist);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

//get full video by id

exports.getFullVideoById = async (req, res) => {
  try {
    const videoId = req.params.id;
    const fullVideo = await Video.findById(videoId)
      .populate({
        path: "category",
        select: "_id title",
      })
      .populate({
        path: "author",
        select: "_id firstName lastName",
      });

    if (!fullVideo) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json(fullVideo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Function to add a like to a video
exports.toggleLike = async (req, res) => {
  try {
    const videoId = req.params.id;
    // Check if video exists
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found!" });
    }

    const userId = req.params.id;

    // Increment the likes count for the video
    video.likes++;
    await video.save();

    res.status(200).json({ message: "Like added to video successfully!" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

//search video By Querry
exports.searchVideoByQuerry = async (req, res) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

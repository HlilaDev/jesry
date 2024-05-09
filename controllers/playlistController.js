const Playlist = require("../models/playlistModel");

//add playlist
exports.addPlaylist = async (req, res) => {
  try {
    const newPlaylist = new Playlist(req.body);
    await newPlaylist.save();
    res.status(200).json("Playlist created !");
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

//Show all playlists
exports.allPlaylists = async (req, res) => {
  try {
    const allplaylists = await Playlist.find();

    res.status(200).json(allplaylists);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

//Show all playlists with videos
exports.allPlaylistsWithVideos = async (req, res) => {
  try {
    const allplaylists = await Playlist.find().populate({
      path: "videos",
      select: "_id url",
    });

    res.status(200).json(allplaylists);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

//Delete Playlist
exports.deletePlaylist = async (req, res) => {
  try {
    const playlistId = req.params.id;
    //check if playlist exist
    const playlistExist = await Playlist.findById(playlistId);
    if (!playlistExist) {
      res.status(404).json("playlist not exist !");
    } else {
      await Playlist.findByIdAndDelete(playlistId);
      res.status(200).json("Playlist has been deleted !");
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

//Update Playlist
exports.editPlaylist = async (req, res) => {
  try {
    const playlistId = req.params.id;
    //check if playlist exist
    const playlistExist = await Playlist.findById(playlistId);
    if (!playlistExist) {
      res.status(404).json("playlist not exist !");
    } else {
      const newPlaylist = req.body;
      newPlaylist.updatedAt = date.now();
      await Playlist.findByIdAndUpdate(playlistId, newPlaylist, { new: true });

      res.status(200).json("Playlist has been updated !");
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

//find Playlist By Id
exports.getPlaylistById = async (req, res) => {
  try {
    const playlistId = req.params.id;
    //check if playlist exist
    const playlistExist = await Playlist.findById(playlistId);
    if (!playlistExist) {
      res.status(404).json("playlist not exist !");
    } else {
      res.status(200).json(playlistExist);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

//populate Playlist by Id
exports.populatePlaylistById = async (req, res) => {
  try {
    const playlistId = req.params.id;

    //check if playlist exist
    const playlist = await Playlist.findById(playlistId).populate("videos");

    if (!playlist) {
      res.status(404).json("playlist not exist !");
    } else {
      res.status(200).json(playlist);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

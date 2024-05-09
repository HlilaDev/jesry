const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Add newuser
exports.addUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    if (req.file) {
      newUser.imageUrl = req.file.filename;
    }

    await newUser.save();
    res.status(201).json("user created successfully !");
  } catch (err) {
    res.status(500).json(err);
  }
};

//get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get user by ID
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const userExist = await User.findById(userId);
    if (!userExist) {
      res.status(404).json("user not existed ! ");
    } else {
      res.status(200).json(userExist);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//edit User

exports.editUser = async (req, res) => {
  try {
    const userId = req.params.id;
    //check user exist
    const userExist = await User.findById(userId);
    if (!userExist) {
      res.status(404).json("user not found !");
    } else {
      const newUser = req.body;
      await User.findByIdAndUpdate(userId, newUser, { new: true });
      res.status(200).json("User updated :");
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

//delete user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    //check user exist
    const userExist = await User.findById(userId);
    if (!userExist) {
      res.status(404).json("user not found !");
    } else {
      await User.findByIdAndDelete(userId);
      res.status(200).json("User deleted successfully !");
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

//register
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, userName, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      userName,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json("User created successfully!");
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

//login
exports.login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName: userName });
    if (!user) {
      return res.status(404).json("userName not existed !");
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect) {
      return res.status(404).json("password incorrect !");
    }
    const token = jwt.sign({ _id: user._id }, process.env.SECRETKEY, {
      expiresIn: "24h",
    });
    res.status(200).json(token);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getVideoFavById = async (req, res) => {
  try {
    const userId = req.params.id;
    //check user exist
    const userExist = await User.findById(userId);

    if (!userExist) {
      res.status(404).json("user not found !");
    } else {
      const userFavList = await userExist.populate({
        path: "videoFav",
        select: "_id title url",
      });
      res.status(200).json(userFavList);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addToFavorites = async (req, res) => {
  try {
    const userId = req.params.userId;
    const videoId = req.body.videoId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.videoFav.includes(videoId)) {
      user.videoFav.push(videoId);
    }

    await user.save();

    res.status(200).json({ message: "Video added to favorites" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//remove from favorite
exports.removeFromFavorites = async (req, res) => {
  try {
    const userId = req.params.userId;
    const videoId = req.body.videoId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.videoFav = user.videoFav.filter((id) => id.toString() !== videoId);

    await user.save();

    res.status(200).json({ message: "Video removed from favorites" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get Role by Id
exports.getRoleById = async (req, res) => {
  try {
    const userId = req.params.id;

    //check user exist
    const userExist = await User.findById(userId);
    if (!userExist) {
      return res.status(404).json("user not found !");
    }
    const userRole = userExist.role;

    res.status(200).json(userRole);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

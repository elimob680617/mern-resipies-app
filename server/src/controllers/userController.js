import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
// @desc Auth user/set token
// route POST /api/users/auth
// @access public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// @desc Register a new user
// route POST /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists!");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Logout user
// route POST /api/users/logout
// @access public
const logoutUser = asyncHandler(async (req, res) => {
  // destroying cookies
  res.cookie("jwt", "", {
    httpOnly: true,
    // expire cookie right away
    expires: new Date(0),
  });

  res.status(200).json({ message: "User Logged out" });
});

// @desc Get user profile
// route GET /api/users/profile
// @access private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };

  res.status(200).json(user);
});

// @desc Update user profile
// route PUT /api/users/profile
// @access private
const updateUserProfile = asyncHandler(async (req, res) => {
  // I want to be able to update password
  const user = await User.findById(req.user._id);

  // check for that user
  if (user) {
    // if that name isn't include in the body then stay what it is
    user.name = req.body.name || user.name;
    // and for email as well
    user.email = req.body.email || user.email;
    // let's check for the password
    if (req.body.password) {
      user.password = req.body.password;
    }
    // save the user with the new data but we want to get that new data to responde with it so put it in the variable
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};

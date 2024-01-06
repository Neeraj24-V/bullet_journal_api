const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register User function
const registerUser = asyncHandler(async (req, res) => {
  console.log("endpoint hit!!!");
  const {
    username,
    firstname,
    lastname,
    email,
    password,
    location,
    profession,
  } = req.body;
  if (!username || !firstname || !lastname || !email || !password) {
    res.sendStatus(400);
    throw new Error("All fields are mandatory");
  }
  const usernameAvailability = await User.findOne({ username });
  if (usernameAvailability) {
    res.sendStatus(400);
    throw new Error("username not available");
  }
  const userAvailability = await User.findOne({ email });
  if (userAvailability) {
    res.sendStatus(400);
    throw new Error("User with same email already exists");
  }
  const hashPassword = await bcrypt.hash(password, 11);
  const user = await User.create({
    firstname,
    lastname,
    username,
    email,
    password: hashPassword,
    location,
    profession,
  });
  if (!user) {
    res.sendStatus(400);
    throw new Error("User not created");
  }
  res.status(201).json({
    success: true,
    message: "User created successfully",
    id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    username: user.username,
  });
});

// Login User function
const loginUser = asyncHandler(async (req, res) => {
  console.log("endpoint hit!!!");
  const { email, password } = req.body;
  if (!email || !password) {
    res.sendStatus(400);
    throw new Error("Email/Password is required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.sendStatus(404);
    throw new Error("User dont have an account");
  }
  if (user && (await bcrypt.compare(password, user.password))) {
    const payload = {
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        date: new Date(user.createdAt).toDateString(),
      },
    };
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
    res.json({ payload, token });
  }
});

// Get Current User
const getCurrentUser = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    res.sendStatus(404);
    throw new Error("No User Presence");
  }
  res.json({ user });
});

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
};

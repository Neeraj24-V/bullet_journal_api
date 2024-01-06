// Importing dependencies
const express = require("express");
const validateToken = require("../middlewares/validateToken");
const { registerUser, loginUser, getCurrentUser } = require("../controller/userController");

const userRouter = express.Router();



userRouter.get("/user-profile", validateToken, getCurrentUser);

userRouter.post(
  "/register",
  registerUser
);

userRouter.post(
  "/login",
  loginUser
);

module.exports = userRouter;

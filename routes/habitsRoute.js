const express = require("express");
const { createHabit, getHabits } = require("../controller/habitController");
const validateToken = require("../middlewares/validateToken");

const habitRouter = express.Router();

// Validate Token Middleware
habitRouter.use(validateToken);

habitRouter.post("/", createHabit);
habitRouter.get("/", getHabits);

module.exports = habitRouter;

const asyncHandler = require("express-async-handler");

const Habit = require("../models/habitsModel");

const createHabit = asyncHandler(async (req, res) => {
  const { habit } = req.body;
  const {id} = req.user
  if (!habit) {
    res.sendStatus(400);
    throw new Error("You should create a new habit");
  }
  const habits = await Habit.create({
    habit,
    user_id: id,
    date: new Date().toDateString(),
  });
  if (!habits) {
    res.sendStatus(400);
    throw new Error("Habit not created!!");
  }
  res.json({ habits });
});

const getHabits = asyncHandler(async (req, res) => {
  const date = new Date(req.query.date).toDateString();
  const {id} = req.user
  if (!date) {
    res.sendStatus(400);
    throw new Error("Enter a date to query");
  }
  const habits = await Habit.find({ 
    user_id: id,
    date 
  });
  if (!habits) {
    res.sendStatus(400);
    throw new Error("No habits found!!");
  }
  res.json({ habits });
});

module.exports = { createHabit, getHabits };

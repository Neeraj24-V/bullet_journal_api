const mongoose = require("mongoose");

const habitsSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    habit: String,
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Habit = mongoose.model('Habits', habitsSchema)


module.exports = Habit
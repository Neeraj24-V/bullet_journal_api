const mongoose = require("mongoose");

const monthlyLogSchema = new mongoose.Schema(
  {
    user_id: {
        type: String,
        required: true
    },
    task: String,
    date: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const yearlyLogSchema = new mongoose.Schema(
  {
    // user_id: {
    //     type: String,
    //     required: true
    // },
    task: String,
    date: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const monthlyLog = mongoose.model("Monthly-Logs", monthlyLogSchema);
const yearlyLog = mongoose.model("Yearly-Logs", yearlyLogSchema);

module.exports = { monthlyLog, yearlyLog };

const asyncHandler = require("express-async-handler");
const {monthlyLog, yearlyLog} = require("../models/logsModel");



const monthlyLogs = asyncHandler(async (req, res) => {
  const { task } = req.body;
  const {id} = req.user
  if (!task) {
    res.sendStatus(400);
    throw new Error("No task found in the request");
  }
  const monthlyTasks = await monthlyLog.create({
        task,
        user_id: id,
        date: new Date().toDateString()
  })
  res.json({ monthlyTasks });
});

const yearlyLogs = asyncHandler(async (req, res) => {
  const { task } = req.body;
  const {id} = req.user
  if (!task) {
    res.sendStatus(400);
    throw new Error("No task found in the request");
  }
  const yearlyTasks = await yearlyLog.create({
    task,
    user_id: id,
    date: new Date().toDateString()
});
  res.json({ yearlyTasks });
});

module.exports = { monthlyLogs, yearlyLogs };

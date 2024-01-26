const asyncHandler = require("express-async-handler");
const { Data } = require("../models/dataModel");

// Create Data
const createData = asyncHandler(async (req, res) => {
  const { val, dataType } = req.body;
  console.log(val, dataType);
  const { id } = req.user;
  if (!val || !dataType) {
    res.sendStatus(400);
    throw new Error("You should enter data");
  }
  const createData = await Data.create({
    val,
    dataType,
    user_id: id,
    date: new Date().toDateString(),
  });
  if (!createData) {
    res.sendStatus(400);
    throw new Error("Data not created");
  }
  res.json({ createData });
});

// Query with date
const getData = asyncHandler(async (req, res) => {
  const date = new Date(req.query.date).toDateString();
  const { id } = req.params;

  if (!date) {
    res.sendStatus(400);
    throw new Error("You should enter a date to query");
  }
  const data = await Data.find({
    user_id: id,
    // date
  });

  res.json({
    user_id: id,
    data,
  });
});

// Update Data
const updateData = asyncHandler(async (req, res) => {
  const { user_id } = req.params;
  const { todoId } = req.query;
  if (!user_id || !todoId) {
    res.sendStatus(400);
    throw new Error("user_id or todoId is required");
  }
  const filter = {user_id: user_id, _id: todoId}
  const update = req.body
  const updatedTodo = await Data.findOneAndUpdate(filter, update)
  if (!updatedTodo) {
    res.sendStatus(400);
    throw new Error("Data not updated");
  }
  res.status(201).json(updatedTodo)
});

// ToDo: Implement Route for querying from and to date

module.exports = {
  createData,
  getData,
  updateData
};

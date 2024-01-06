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

// ToDo: Implement Route for querying from and to date

module.exports = {
  createData,
  getData,
};

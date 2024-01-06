const express = require("express");
const asyncHandler = require("express-async-handler");
const { createData, getData } = require("../controller/dataController");
const validateToken = require("../middlewares/validateToken");

const netRouter = express.Router();

// Validate Token Middleware
netRouter.use(validateToken);

// Route for creating Tasks
netRouter.post("/data", createData);

// ToDo: Implement Route for querying from and to date

netRouter.get("/:id", getData);

module.exports = netRouter;

const express = require("express");
const {
  createData,
  getData,
  updateData,
  deleteData,
} = require("../controller/dataController");
const validateToken = require("../middlewares/validateToken");

const netRouter = express.Router();

// Validate Token Middleware
netRouter.use(validateToken);

// Route for creating Tasks
netRouter.post("/data", createData);

//update route
netRouter.patch("/data/:user_id", updateData);

//delete route
netRouter.delete("/data/:user_id", deleteData);

// ToDo: Implement Route for querying from and to date

netRouter.get("/:id", getData);

module.exports = netRouter;

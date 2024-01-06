const express = require("express");
const { monthlyLogs, yearlyLogs } = require("../controller/logsController");
const validateToken = require("../middlewares/validateToken");
const logsrouter = express.Router();

// Validate Token middleware
logsrouter.use(validateToken);

logsrouter.post("/monthly-logs", monthlyLogs);
logsrouter.post("/yearly-logs", yearlyLogs);

module.exports = logsrouter;

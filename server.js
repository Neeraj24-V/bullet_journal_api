const express = require("express");
const connectDB = require("./db/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
const userRouter = require("./routes/userRoute");
const netRouter = require("./routes/dataRoute");
const logsRouter = require("./routes/logsRoute");
const habitRouter = require("./routes/habitsRoute");
const cors = require("cors");
require("./utils/ping-cron-job");
require("./utils/mail");

const app = express();

// Using cors
// const corsOptions = {
//   origin: "https://bullet-journal-client.vercel.app",
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

const allowedOrigins = [
  "https://bullet-journal-client.vercel.app",
  "http://localhost:5173",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      allowedOrigins.includes("localhost")
    ) {
      callback(null, true);
    } else {
      callback(new Error("not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
} else {
  console.log(
    "Development Environment Variables doesn't work on Production Environment",
  );
}

// here we call connectDB to initiate a db connection
connectDB((err) => {
  if (!err) {
    app.listen(process.env.PORT, () => {
      console.log(`Connected server at: http://localhost:${process.env.PORT}`);
    });
  } else {
    console.log("Connection to the database failed");
    process.exit(1);
  }
});

// Middlewares
// app.use(passport.initialize())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(errorHandler);

// routes
app.get("/", (req, res) => {
  res.send("Hi there!!! Your server is running");
});

// for login register routes
app.use("/api/v1/journal/auth", userRouter);

// Note Task Event Route
app.use("/api/v1/journal", netRouter);

// logs
app.use("/api/v1/journal/logs", logsRouter);

// Habit tracker
app.use("/api/v1/journal/habits", habitRouter);

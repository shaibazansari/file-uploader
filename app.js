const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const fileRouter = require("./routes/fileRoutes");
const authRouter = require("./routes/userRoutes");

// Start express app
const app = express();

// 1.Global Middleware
const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api", fileRouter);
app.use("/auth", authRouter);

app.all("*", (req, res, next) => {
  // next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global error handling middleware
// app.use(globalErrorHandler);
module.exports = app;

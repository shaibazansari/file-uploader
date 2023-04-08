const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const fileRouter = require("./routes/fileRoutes");
const authRouter = require("./routes/userRoutes");

// Start express app
const app = express();

// 1.Global Middleware
const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, '/client/dist')));

app.use("/api/files", fileRouter);
app.use("/api/auth", authRouter);

app.all("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, '/client/dist', 'index.html'));
});

module.exports = app;

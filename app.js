const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
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

app.use(express.static(path.join(__dirname, '/client/dist')));

app.use("/api/files", fileRouter);
app.use("/api/auth", authRouter);

app.all("*", (req, res) => {
  res.sendFile(path.join(__dirname, '/client/dist', 'index.html'));
});

console.log("here ", __dirname, path.join(__dirname, '/client/dist', 'index.html'));

module.exports = app;

const express = require("express");
const fileController = require("../controllers/fileController");
const authController = require("../controllers/authController");
const upload = require("../utils/upload");

const router = express.Router();

router.route("/").get(authController.protect, fileController.getAllFiles);
router.route("/upload").post(authController.protect, upload.single("file"), fileController.uploadFile);

module.exports = router;

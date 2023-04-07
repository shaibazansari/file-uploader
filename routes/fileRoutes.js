const express = require("express");
const fileController = require("../controllers/fileController");
const authController = require("../controllers/authController");
const upload = require("../utils/upload");

const router = express.Router();

router.route("/uploadFile").post(authController.protect, upload.single("file"), fileController.uploadFile);
router.route("/files").get(authController.protect, fileController.getAllFiles);

module.exports = router;

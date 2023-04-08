const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/login").get(authController.checkLoggedIn).post(authController.login);

module.exports = router;

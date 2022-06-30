const express = require("express");
const router = express.Router();

const { registerUser, loginUser, logoutUser} = require("../../controllers/users/authController");

router.route("/register").post(registerUser)
router.route("/login").get(loginUser)
router.route("/logout").get(logoutUser);

module.exports = router; 
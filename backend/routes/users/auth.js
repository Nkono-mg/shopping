const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../../middlewares/authCheck");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPasswordUser,
  resetPasswordUser,
  getUserProfile,
  updateUserPassword,
} = require("../../controllers/users/authController");

router.route("/register").post(registerUser);
router.route("/login").get(loginUser);
router.route("/logout").get(logoutUser); 
router.route("/password/forgot").post(forgotPasswordUser);
router.route("/reset/password/:token").put(resetPasswordUser);
router.route("/me/profile").get(isAuthenticatedUser, getUserProfile);
router
  .route("/password/update")
  .put(isAuthenticatedUser, updateUserPassword);

module.exports = router;

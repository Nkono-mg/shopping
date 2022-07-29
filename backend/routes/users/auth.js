const express = require("express");
const router = express.Router();
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../../middlewares/authCheck");

const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPasswordUser,
  resetPasswordUser,
  getUserProfile,
  updateUserPassword,
  updateUserProfil,
  getAllUser,
  getSingleUser, updateUserInfo, deleteUser
} = require("../../controllers/users/authController");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPasswordUser);
router.route("/reset/password/:token").put(resetPasswordUser);
router.route("/me/profile").get(isAuthenticatedUser, getUserProfile);
router.route("/password/update").put(isAuthenticatedUser, updateUserPassword);
router.route("/me/profile/update").put(isAuthenticatedUser, updateUserProfil);
router
  .route("/admin/users/all")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);
router
  .route("/admin/users/one/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser);
router
  .route("/admin/user/update/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserInfo);
router
  .route("/admin/user/delete/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;


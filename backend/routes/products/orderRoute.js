const express = require("express");
const router = express.Router();

const {addOrder} = require("../../controllers/products/orderController");
const {isAuthenticatedUser, authorizeRoles} = require('../../middlewares/authCheck');

router.route("/order/new").post(isAuthenticatedUser, addOrder);


module.exports = router;  
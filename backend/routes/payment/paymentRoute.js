const express = require("express");
const router = express.Router();

const { processPayment, sendStripeApi } = require("../../controllers/payment/paymentController")
const {isAuthenticatedUser} = require('../../middlewares/authCheck');

router.route("/orders/payment").post(isAuthenticatedUser, processPayment);
router.route("/stripeapi").get(isAuthenticatedUser, sendStripeApi);


module.exports = router;  
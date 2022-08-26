const catchAsyncError = require("../../middlewares/catchAsyncError");
const stripe = require("stripe")("process.env.STRIPE_SECRET_KEY");

// Process stripe payement
module.exports.processPayment = catchAsyncError(async (req, res, next) => {

    const payementIntent = await stripe.payementIntent.create({
        amount: req.body.amount,
        currency: "usd",
        metadata: { 
            integration_check: "accept_a_payment"
        }
    })
    return res.status(200).json({
        success: true,
        client_Secret: payementIntent.client_Secret
    })
})

// Send stripe api key
module.exports.sendStripeApi = catchAsyncError(async (req, res, next) => {
    console.log(process.env.STRIPE_API_KEY)
    return res.status(200).json({
        success: true,
        stripeApiKey: process.env.STRIPE_API_KEY
    })
})
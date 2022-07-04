const orderModel = require("../../models/products/orderModel");
const productModel = require("../../models/products/productModel");
const ErrorHandler = require("../../utils/errorHandler");
const catchAsyncError = require("../../middlewares/catchAsyncError");

//Create a new order => /api/shoping/order/new
module.exports.addOrder = catchAsyncError(async (req, res, next) => {
  const {
    //orderItems,
    shippingInfo,
     shippingPrice,
    taxPrice,
    itemsPrice,
    paymentInfo,
    totalPrice, 
  } = req.body;
  const order = await orderModel.create({
    orderItems,
    shippingInfo,
     shippingPrice,
    taxPrice,
    itemsPrice,
    paymentInfo,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id, 
  });
  return res.status(200).json({
    success: true,
    order,
  });
});

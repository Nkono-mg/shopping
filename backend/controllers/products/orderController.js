const orderModel = require("../../models/products/orderModel");
const ObjectId = require("mongoose").Types.ObjectId;
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
    //orderItems,
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

//Get single order =>/api/shopping/order/:id
module.exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return next(new ErrorHandler(`Order not found: ${req.params.id}`, 404));
  } else {
    const order = orderModel
      .findById(req.params.id)
      .populate("user", "name email");
    return res.status(200).json({
      success: true,
      order,
    });
  }
});

//Get logged in user orders =>/api/shopping/orders/me
module.exports.getMyAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await orderModel.find({ user: req.user.id });
  if (!orders) {
    return next(new ErrorHandler(`No orders found for ${req.user.name}`, 404));
  }
  return res.status(200).json({
    success: true,
    orders,
  });
});

//Get all orders => /api/shopping/admin/orders/all
module.exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await orderModel.find();
  if (!orders) {
    return next(new ErrorHandler("Orders not found", 404));
  }
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  return res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

//Update Process Order => /api/shopping/admin/order/:id
module.exports.updateProcessOrder = catchAsyncError(async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return next(new ErrorHandler(`Order not found: ${req.params.id}`, 404));
  } else {
    const order = await orderModel.findById(req.params.id);
    if (order.orderStatus === "Delivered") {
      return next(
        new ErrorHandler("You have already delivered this order", 400)
      );
    }
    order.orderItems.forEach(async (item) => {
      await updateStock(item.product, item.quantity);
    });
    order.orderStatus = req.body.status;
    order.deliveredAt = Date.now();
    await order.save();
    return res.status(200).json({
      success: true,
      message: `Order is updated`,
    });
  }
});

//update stock function
async function updateStock(id, quantity) {
  const product = await productModel.findById(id);
  product.stock = product.stock - product.quantity;
  await product.save({ validateBeforeSave: false });
}

//Delete order =>/api/shopping/order/delete/:id
module.exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return next(new ErrorHandler(`Order not found: ${req.params.id}`, 404));
  } else {
    await orderModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: `Order is deleted`,
    });
  }
});

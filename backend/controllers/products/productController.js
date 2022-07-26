const productModel = require("../../models/products/productModel");
const ObjectId = require("mongoose").Types.ObjectId;
const ErrorHandler = require("../../utils/errorHandler");
const catchAsyncError = require("../../middlewares/catchAsyncError");
const APIFeatures = require("../../utils/apiFeatures");

//Create a new product
exports.addProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id; //Add user reference in product
  const productData = await productModel.create(req.body);
  return res.status(201).json({
    success: true,
    productData,
  });
});

//get all products
exports.getProducts = catchAsyncError(async (req, res, next) => {
  const resPerPage = 3;
  const productCount = await productModel.countDocuments();
  const apiFeature = new APIFeatures(productModel.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);
  const products = await apiFeature.query;
  if (!products) {
    return next(new ErrorHandler("Product not found", 404));
  } else {
    setTimeout(() => {
      return res.status(200).json({
        success: true,
        totalProduct: products.length,
        productCount,
        products,
      });
    }, 1000);
  }
});

//get one product
module.exports.getOneProduct = catchAsyncError(async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return next(new ErrorHandler("Product not found", 404));
  } else {
    const product = await productModel.findById(req.params.id);
    setTimeout(() => {
      return res.status(200).json({
        success: true,
        product,
      });
    }, 2000);
  }
});

//update product
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return next(new ErrorHandler("Product not found", 404));
  } else {
    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    return res.status(201).json({
      success: true,
      product,
    });
  }
});

//delete product
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return next(new ErrorHandler("Product not found", 404));
  } else {
    await productModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Product is deleted",
    });
  }
});

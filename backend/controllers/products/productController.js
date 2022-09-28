const productModel = require("../../models/products/productModel");
const ObjectId = require("mongoose").Types.ObjectId;
const ErrorHandler = require("../../utils/errorHandler");
const catchAsyncError = require("../../middlewares/catchAsyncError");
const APIFeatures = require("../../utils/apiFeatures");
const cloudinary = require("../../utils/cloudinary");

//Create a new product
exports.addProduct = catchAsyncError(async (req, res, next) => {

  let images = [];
  if (typeof (req.body.images === "string")) {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  
  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.uploader.upload(images[i], {
      folder: 'products',
      upload_preset: "shopping_cloud",
      allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfif", "webp", "gif"]
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url
    });
  }
  req.body.images = imagesLinks;
  req.body.user = req.user.id; //Add user reference in product
  const productData = await productModel.create(req.body);
  return res.status(201).json({
    success: true,
    productData,
  });
});

//get all products
exports.getProducts = catchAsyncError(async (req, res, next) => {
  const resPerPage = 4;
  const productCount = await productModel.countDocuments();
  const apiFeature = new APIFeatures(productModel.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);
  let products = await apiFeature.query;
  let filteredProductsCount = products.length;
  if (!products) {
    return next(new ErrorHandler("Product not found", 404));
  } else {
    return res.status(200).json({
      success: true,
      productCount,
      resPerPage,
      filteredProductsCount,
      products,
    });
  }
});

//get admin all products
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
  const products = await productModel.find();
  if (!products) {
    return next(new ErrorHandler("Product not found", 404));
  } else {
    return res.status(200).json({
      success: true,
      products,
    });
  }
});

//get one product
module.exports.getOneProduct = catchAsyncError(async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return next(new ErrorHandler("Product not found", 404));
  } else {
    const product = await productModel.findById(req.params.id);
    return res.status(200).json({
      success: true,
      product,
    });
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

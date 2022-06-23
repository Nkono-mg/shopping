const productModel = require("../../models/products/productModel");

//Create a new product
exports.addProduct = async (req, res, next) => {
  const productData = await productModel.create(req.body);
  return res.status(201).json({
    success: true,
    productData,
  });
};

//get all products
exports.getProducts = async (req, res, next) => {
  const products = await productModel.find();
  return res.status(200).json({
    success: true,
    totalProduct: products.length,
    products,
  });
};

//get a single product
exports.getOneProduct = async (req, res, next) => {
  const product = await productModel.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  } else {
    return res.status(200).json({
      success: true,
      product,
    });
  }
};

//update product
exports.updateProduct = async (req, res, next) => {
  let product = await productModel.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  } else {
    product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    return res.status(201).json({
      success: true,
      product,
    });
  }
};

//delete product
exports.deleteProduct = async (req, res, next) => {
  const product = await productModel.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  } else {
    await product.remove();
    return res.status(200).json({
      success: true,
      message: "Product is deleted",
    });
  }
};

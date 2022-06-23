const express = require("express");
const router = express.Router();

const {addProduct, getProducts, getOneProduct, updateProduct, deleteProduct} = require("../../controllers/products/productController");

router.route("/products").get(getProducts);
router.route("/admin/products").post(addProduct);
router.route("/products/:id").get(getOneProduct);
router.route("/admin/products/:id").put(updateProduct);
router.route("/admin/products/:id").delete(deleteProduct); 


module.exports = router; 
const express = require("express");
const router = express.Router();

const {addProduct, getProducts, getOneProduct, updateProduct, deleteProduct} = require("../../controllers/products/productController");
const {isAuthenticatedUser, authorizeRoles} = require('../../middlewares/authCheck');

router.route("/products").get(getProducts);
router.route("/admin/products/new").post(isAuthenticatedUser, authorizeRoles("admin"), addProduct);
router.route("/product/:id").get(getOneProduct);
router.route("/admin/products/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);
router.route("/admin/products/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);  


module.exports = router; 
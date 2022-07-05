const express = require("express");
const router = express.Router();

const {addOrder, getSingleOrder, getMyAllOrders, getAllOrders, updateProcessOrder, deleteOrder} = require("../../controllers/products/orderController");
const {isAuthenticatedUser, authorizeRoles} = require('../../middlewares/authCheck');

router.route("/order/new").post(isAuthenticatedUser, addOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/order/me/all").get(isAuthenticatedUser, getMyAllOrders);
router.route("/admin/orders/all").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);
router.route("/admin/order/update/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateProcessOrder);
router.route("/admin/order/delete/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);


module.exports = router;  
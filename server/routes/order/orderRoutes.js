const express = require("express");
const router = express.Router();
const orderController = require("../../controller/order/orderController");
const checkUserStatus = require("../../middleweres/authCustomerMiddleware");

////////////////////// customer////////////////////

router.post(
  "/home/order/place-order",
  checkUserStatus,
  orderController.place_order
);
router.get(
  "/home/customer/get-orders/:customerId/:status",
  checkUserStatus,
  orderController.get_orders
);
router.get(
  "/home/customer/get-order-details/:orderId",
  checkUserStatus,
  orderController.get_order_details
);
router.put(
  "/home/customer/cancel-order/:orderId",
  checkUserStatus,
  orderController.cancel_order
);
router.put(
  "/home/customer/cod-payment/:orderId",
  checkUserStatus,
  orderController.cod_payment
);

//////////////////// admin/////////////////////////

router.get("/admin/orders", orderController.get_admin_order);
router.get(
  "/admin/specific-order/:orderId",
  orderController.get_admin_specific_order
);
router.put(
  "/admin/order-status/update/:orderId",
  orderController.admin_order_status_update
);

////////////////////Seller//////////////////////////
router.get("/seller/orders/:sellerId", orderController.get_seller_order);
router.get(
  "/seller/specific-order/:adminOrderId/:sellerId",
  orderController.get_seller_specific_order
);
router.put(
  "/seller/order-status/update/:adminOrderId",
  orderController.seller_order_status_update
);

module.exports = router;

const express = require("express");
const router = express.Router();
const orderController = require("../../controller/order/orderController");

////////////////////// customer////////////////////

router.post("/home/order/place-order", orderController.place_order);
router.get(
  "/home/customer/get-orders/:customerId/:status",
  orderController.get_orders
);
router.get(
  "/home/customer/get-order-details/:orderId",
  orderController.get_order_details
);
router.put(
  "/home/customer/cancel-order/:orderId",
  orderController.cancel_order
);
router.put("/home/customer/cod-payment/:orderId", orderController.cod_payment);

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

const express = require("express");
const router = express.Router();
const orderController = require("../../controller/home/orderController");

router.post("/home/order/place-order", orderController.place_order);
router.get(
  "/home/customer/get-orders/:customerId/:status",
  orderController.get_orders
);

module.exports = router;

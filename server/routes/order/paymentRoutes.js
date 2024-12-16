const express = require("express");
const router = express.Router();
const checkUserStatus = require("../../middleweres/authCustomerMiddleware");
const paymentController = require("../../controller/order/paymentController");

router.post(
  "/home/customer/online-payment/create-order/:orderId",
  checkUserStatus,
  paymentController.create_razorpay_payment_order
);

module.exports = router;

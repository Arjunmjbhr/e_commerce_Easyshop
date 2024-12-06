const express = require("express");
const router = express.Router();
const orderController = require("../../controller/home/orderController");

router.post("/home/order/place-order", orderController.place_order);

module.exports = router;

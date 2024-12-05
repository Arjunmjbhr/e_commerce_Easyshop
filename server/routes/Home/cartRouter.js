const express = require("express");
const router = express.Router();
const cartController = require("../../controller/home/cartController");

// Route for adding a product to the cart
router.post("/home/product/add-to-cart", cartController.add_to_cart);

module.exports = router;

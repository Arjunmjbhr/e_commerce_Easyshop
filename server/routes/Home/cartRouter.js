const express = require("express");
const router = express.Router();
const cartController = require("../../controller/home/cartController");

// Route for adding a product to the cart
router.post("/home/product/add-to-cart", cartController.add_to_cart);
router.get(
  "/home/product/get-cart-product/:userId",
  cartController.get_cart_products
);
router.delete(
  "/home/product/delete-cart-product/:cartId",
  cartController.delete_cart_products
);

module.exports = router;

const router = require("express").Router();
const wishlistController = require("../../controller/home/wishlistController");
const authCustomerMiddlewere = require("../../middleweres/authCustomerMiddleware");

router.post(
  "/home/product/add-to-wishlist",
  authCustomerMiddlewere,
  wishlistController.add_to_wishlist
);
module.exports = router;

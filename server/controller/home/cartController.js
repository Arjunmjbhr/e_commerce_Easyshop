const cartModel = require("../../model/cartModel");
const { responseReturn } = require("../../utils/response");
const {
  mongo: { ObjectId },
} = require("mongoose");
class cartController {
  add_to_cart = async (req, res) => {
    const { userId, quantity, productId } = req.body;
    console.log(req.body);

    try {
      // Validate input data
      if (!userId || !quantity || !productId) {
        return responseReturn(res, 400, { error: "All fields are required." });
      }

      // Check if the product is already in the user's cart
      const existingProduct = await cartModel.findOne({ productId, userId });
      if (existingProduct) {
        return responseReturn(res, 400, {
          error: "Product already added to the cart.",
        });
      }

      // Add the product to the cart
      const product = await cartModel.create({
        userId,
        productId,
        quantity,
      });
      return responseReturn(res, 200, {
        message: "Product added to cart.",
        product,
      });
    } catch (error) {
      console.error("Error while adding product to cart:", error.message);
      return responseReturn(res, 500, {
        error: "Internal server error.",
      });
    }
  };
  get_cart_products = async (req, res) => {
    console.log("get cart product controller invoked");
    const { userId } = req.params;
    try {
      const cart_product = await cartModel.aggregate([
        {
          $match: { userId: { $eq: new ObjectId(userId) } },
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "products",
          },
        },
      ]);
      let buy_product_item = 0;
      let calculatePrice = 0;
      let cart_product_count = 0;
      //   finding out of stock product
      const outOfStockProudct = cart_product.filter(
        (pro) => pro.products[0].stock < pro.quantity
      );
      for (let i = 0; i < outOfStockProudct.length; i++) {
        cart_product_count = cart_product_count + outOfStockProudct[i].quantity;
      }
      //   finding  stocked product
      const stockProduct = cart_product.filter(
        (pro) => pro.products[0].stock > pro.quantity
      );
      for (let i = 0; i < stockProduct; i++) {
        const { quantity } = stockProduct[i];
        cart_product_count = buy_product_item + quantity;
        buy_product_item = buy_product_item + quantity;

        const { price, discount } = stockProduct[i].products[0];
        if (discount !== 0) {
          calculatePrice =
            calculatePrice +
            quantity * (price - Math.floor((price * discount) / 100));
        } else {
          calculatePrice = calculatePrice + quantity * price;
        }
      } //end of for loop for stocked products
      console.log(cart_product);
    } catch (error) {}
  };
}

module.exports = new cartController();

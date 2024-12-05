const cartModel = require("../../model/cartModel");
const { responseReturn } = require("../../utils/response");
class cartController {
  add_to_cart = async (req, res) => {
    console.log("cart controller invoked");
    const { userId, quantity, productId } = req.body;
    console.log(req.body);

    try {
      // Validate input data
      if (!userId || !quantity || !productId) {
        return res.status(400).json({ error: "All fields are required." });
      }

      // Check if the product is already in the user's cart
      const existingProduct = await cartModel.findOne({ productId, userId });
      if (existingProduct) {
        return res
          .status(400)
          .json({ error: "Product already added to the cart." });
      }

      // Add the product to the cart
      const product = await cartModel.create({
        userId,
        productId,
        quantity,
      });

      return res
        .status(201)
        .json({ message: "Product added to cart.", product });
    } catch (error) {
      console.error("Error while adding product to cart:", error.message);
      return res.status(500).json({ error: "Internal server error." });
    }
  };
}

module.exports = new cartController();

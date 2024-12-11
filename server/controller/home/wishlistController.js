const wishlistModel = require("../../model/wishlistModel");
const { responseReturn } = require("../../utils/response");

class wishlistController {
  add_to_wishlist = async (req, res) => {
    console.log("in the wishlist controller");
    console.log(req.body);
    const { userId, productId } = req.body;

    try {
      const wishlist = await wishlistModel.findOne({ userId, productId });
      if (wishlist) {
        return responseReturn(res, 400, {
          error: "product already added to the wishlist",
        });
      }
      const newWishlist = await wishlistModel.create({
        userId,
        productId,
      });

      return responseReturn(res, 200, { message: "product added to wishlist" });
    } catch (error) {
      console.log("error in the wishlist adding ", error.message);
      return responseReturn(res, 500, { error: "interner server error" });
    }
  };
  // End Method
  get_wishlist_product = async (req, res) => {
    console.log("In the wishlist controller");

    const { userId } = req.params;

    try {
      // Fetch all wishlist items for the user and populate product details
      const wishlist = await wishlistModel
        .find({ userId })
        .populate("productId");

      // Count the total number of wishlist items
      const wishlist_count = await wishlistModel.countDocuments({ userId });

      // Return the response
      return responseReturn(res, 200, {
        wishlist_count: wishlist_count || 0,
        wishlist,
      });
    } catch (error) {
      console.error("Error in get_wishlist_product:", error.message);

      // Handle and return the error
      return responseReturn(res, 500, {
        error: "Internal server error",
      });
    }
  };
  // End Method
  delete_wishlist_product = async (req, res) => {
    console.log("in hte wishlist controller");
    console.log(req.params);
    const { wishlistId } = req.params;
    try {
    } catch (error) {}
  };
}

module.exports = new wishlistController();

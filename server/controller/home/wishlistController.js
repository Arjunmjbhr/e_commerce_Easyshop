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
}

module.exports = new wishlistController();

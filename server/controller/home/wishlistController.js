const wishlistModel = require("../../model/wishlistModel");
const { responseReturn } = require("../../utils/response");

class wishlistController {
  // adding offer filed in the product
  getCategoryOfferLookup() {
    return {
      $lookup: {
        from: "categoryoffers",
        let: { category: "$category" }, // Pass local category field
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$offerCategory", "$$category"] },
                  { $eq: ["$isActive", true] },
                  { $gte: ["$expirationDate", new Date()] },
                  { $lte: ["$startingDate", new Date()] },
                ],
              },
            },
          },
          { $limit: 1 }, // Get only the most relevant active offer
        ],
        as: "categoryOffers", // Store the result in 'categoryOffers'
      },
    };
  }
  getValidOfferAddField() {
    return {
      $addFields: {
        validOfferPercentage: {
          $cond: {
            if: { $gt: [{ $size: "$categoryOffers" }, 0] }, // Check if any offer exists
            then: { $arrayElemAt: ["$categoryOffers.offerPercentage", 0] }, // Extract offer percentage
            else: 0, // If no offer, set to 0
          },
        },
      },
    };
  }
  getProjectCategoryOffers() {
    return {
      $project: { categoryOffers: 0 }, // Exclude categoryOffers array from final result
    };
  }
  //////////////
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
    console.log("In the wishlist controller");

    const { wishlistId } = req.params;
    if (!wishlistId) {
      return responseReturn(res, 400, { error: "Wishlist ID is required" });
    }

    try {
      const deletedWishlist = await wishlistModel.findByIdAndDelete(wishlistId);

      if (!deletedWishlist) {
        return responseReturn(res, 404, { error: "Wishlist item not found" });
      }

      console.log(`Product removed from wishlist `);
      return responseReturn(res, 200, { message: "Removed from the wishlist" });
    } catch (error) {
      console.error(
        "Error while deleting product from the wishlist:",
        error.message
      );
      return responseReturn(res, 500, { error: "Internal server error" });
    }
  };
}

module.exports = new wishlistController();

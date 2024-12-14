const categoryModel = require("../../model/categoryModel");
const productModel = require("../../model/productModel");
const { responseReturn } = require("../../utils/response");

class homeController {
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

  formate_product = (products) => {
    const productArray = [];
    let i = 0;
    while (i < products.length) {
      let temp = [];
      let j = i;
      while (j < i + 3) {
        if (products[j]) {
          temp.push(products[j]);
        }
        j++;
      }
      productArray.push([...temp]);
      i = j;
    }
    return productArray;
  };
  get_categories = async (req, res) => {
    try {
      const categories = await categoryModel.find({ isDeleted: false });
      if (!categories) {
        responseReturn(res, 404, { error: "error while fetchig the category" });
      }
      responseReturn(res, 200, {
        categories,
        message: "successfuly get categories",
      });
    } catch (error) {
      console.log("error while fetchin the category");
      responseReturn(res, 500, { error: "internel server error" });
    }
  };
  get_products = async (req, res) => {
    try {
      const allProduct = await productModel.aggregate([
        {
          $match: { isDeleted: false }, // Filter for valid products
        },
        this.getCategoryOfferLookup(),
        this.getValidOfferAddField(),
        this.getProjectCategoryOffers(),
        {
          $limit: 12,
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ]);

      // latest products
      // const allProducts_1 = await productModel
      //   .find({ isDeleted: false })
      //   .limit(9)
      //   .sort({
      //     createdAt: -1,
      //   });
      const allProducts_1 = await productModel.aggregate([
        {
          $match: { isDeleted: false }, // Filter for valid products
        },
        this.getCategoryOfferLookup(),
        this.getValidOfferAddField(),
        this.getProjectCategoryOffers(),
        {
          $limit: 9,
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ]);
      const latest_product = this.formate_product(allProducts_1);
      //discounted products
      // const allProducts_2 = await productModel
      //   .find({ isDeleted: false })
      //   .limit(9)
      //   .sort({
      //     discount: -1,
      //   });
      const allProducts_2 = await productModel.aggregate([
        {
          $match: { isDeleted: false }, // Filter for valid products
        },
        this.getCategoryOfferLookup(),
        this.getValidOfferAddField(),
        this.getProjectCategoryOffers(),
        {
          $limit: 9,
        },
        {
          $sort: {
            discount: -1,
          },
        },
      ]);
      const discounted_product = this.formate_product(allProducts_2);

      //top rated products
      // const allProducts_3 = await productModel
      //   .find({ isDeleted: false })
      //   .limit(9)
      //   .sort({
      //     rating: -1,
      //   });
      const allProducts_3 = await productModel.aggregate([
        {
          $match: { isDeleted: false },
        },
        this.getCategoryOfferLookup(),
        this.getValidOfferAddField(),
        this.getProjectCategoryOffers(),
        {
          $limit: 9,
        },
        {
          $sort: {
            rating: -1,
          },
        },
      ]);
      const topRated_product = this.formate_product(allProducts_3);

      responseReturn(res, 200, {
        products: allProduct,
        topRated_product,
        discounted_product,
        latest_product,
        message: "successfuly fetch product data",
      });
    } catch (error) {
      console.log(error.message);
      console.log("error while fetchin the category");
      responseReturn(res, 500, { error: "internel server error" });
    }
  };
  product_details = async (req, res) => {
    const { slug } = req.params;
    try {
      const product = await productModel.aggregate([
        {
          $match: {
            slug, // Matches a document where the "slug" field equals the provided value
          },
        },
        this.getCategoryOfferLookup(), // Custom method to add a lookup stage for category offers
        this.getValidOfferAddField(), // Custom method to add a field for valid offers
        this.getProjectCategoryOffers(), // Custom method to project (shape) category offer data
      ]);

      if (!product) {
        return responseReturn(res, 404, { error: "Product not found" });
      }

      const relatedProducts = await productModel.aggregate([
        {
          $match: {
            isDeleted: false,
            _id: { $ne: product[0]._id },
            category: product[0].category,
          },
        },
        this.getCategoryOfferLookup(),
        this.getValidOfferAddField(),
        this.getProjectCategoryOffers(),

        {
          $limit: 12,
        },
      ]);

      // Fetch more products from the same seller, excluding the current product

      const moreProducts = await productModel.aggregate([
        {
          $match: {
            _id: { $ne: product[0]._id },
            sellerId: product[0].sellerId,
          },
        },
        this.getCategoryOfferLookup(),
        this.getValidOfferAddField(),
        this.getProjectCategoryOffers(),
        {
          $limit: 3,
        },
      ]);

      // Return the response
      responseReturn(res, 200, {
        product: product[0],
        relatedProducts,
        moreProducts,
      });
    } catch (error) {
      console.error(error.message);
      console.error("Error while fetching the product details");
      responseReturn(res, 500, { error: "Internal server error" });
    }
  };
  get_price_range = async (req, res) => {
    try {
      // Initialize the price range
      let priceRange = {
        low: 0,
        high: 0,
      };

      // Fetch the highest and lowest price excluding deleted products
      const [result] = await productModel.aggregate([
        {
          $match: { isDeleted: { $ne: true } }, // Exclude products with isDeleted: true
        },
        {
          // Step 1: Calculate the discounted price for each product
          $addFields: {
            discountedPrice: {
              $subtract: [
                "$price",
                { $multiply: ["$price", { $divide: ["$discount", 100] }] }, // price - (price * discount / 100)
              ],
            },
          },
        },
        {
          // Step 2: Group to find the min and max of the discounted price
          $group: {
            _id: null,
            low: { $min: "$discountedPrice" }, // Lowest discounted price
            high: { $max: "$discountedPrice" }, // Highest discounted price
          },
        },
      ]);

      console.log(result);
      // Update priceRange if products are found
      if (result) {
        priceRange = {
          low: result.low,
          high: result.high,
        };
      }
      const allProducts_1 = await productModel
        .find({ isDeleted: false })
        .limit(9)
        .sort({
          createdAt: -1,
        });
      const latest_product = this.formate_product(allProducts_1);
      return responseReturn(res, 200, { priceRange, latest_product });
    } catch (error) {
      console.error("Error in get_price_range:", error);
      return responseReturn(res, 500, { message: "Internal Server Error" });
    }
  };
  query_products = async (req, res) => {
    const {
      lowPrice,
      highPrice,
      rating,
      category,
      sortPrice,
      pageNumber,
      searchValue,
    } = req.query;

    const lowPriceInt = parseInt(lowPrice, 10) || 0;
    const highPriceInt = parseInt(highPrice, 10) || Infinity;
    const ratingInt = parseInt(rating, 10) || 0;
    const pageNumberInt = parseInt(pageNumber, 10) || 1;
    const perPage = 9;

    const matchFilter = {
      isDeleted: false,
      ...(category && { category }),
      ...(rating && { rating: { $gte: ratingInt } }),
    };

    const sortFilter = {};
    if (sortPrice === "low-to-high") {
      sortFilter.discountedPrice = 1;
    } else if (sortPrice === "high-to-low") {
      sortFilter.discountedPrice = -1;
    } else if (sortPrice === "zZ-aA") {
      sortFilter.createdAt = 1;
    } else {
      sortFilter.createdAt = -1;
    }

    const skip = (pageNumberInt - 1) * perPage;

    try {
      // Aggregation 1: Total count of matching products
      const totalCountResult = await productModel.aggregate([
        // First stage: $text search, if searchValue exists
        ...(searchValue
          ? [{ $match: { $text: { $search: searchValue } } }]
          : []),
        // Add discountedPrice field
        {
          $addFields: {
            discountedPrice: {
              $subtract: [
                "$price",
                { $multiply: ["$price", { $divide: ["$discount", 100] }] },
              ],
            },
          },
        },
        // Filter by other criteria
        {
          $match: {
            ...matchFilter,
            discountedPrice: { $gte: lowPriceInt, $lte: highPriceInt },
          },
        },

        // Count total documents
        { $count: "totalCount" },
      ]);

      const totalCount = totalCountResult[0]?.totalCount || 0; // Default to 0 if no results

      // Aggregation 2: Fetch paginated products

      const totalProducts = await productModel.aggregate([
        // First stage: $text search, if searchValue exists
        ...(searchValue
          ? [{ $match: { $text: { $search: searchValue } } }]
          : []),
        // Add discountedPrice field
        {
          $addFields: {
            discountedPrice: {
              $subtract: [
                "$price",
                { $multiply: ["$price", { $divide: ["$discount", 100] }] },
              ],
            },
          },
        },
        // Filter by other criteria
        {
          $match: {
            ...matchFilter,
            discountedPrice: { $gte: lowPriceInt, $lte: highPriceInt },
          },
        },
        //lookup for adding offer
        this.getCategoryOfferLookup(),
        this.getValidOfferAddField(),
        this.getProjectCategoryOffers(),
        // Sorting
        { $sort: sortFilter },
        // Pagination
        { $skip: skip },
        { $limit: perPage },
      ]);

      // Return response
      return responseReturn(res, 200, { totalCount, totalProducts, perPage });
    } catch (error) {
      console.error("Error fetching products:", error);
      return responseReturn(res, 500, { message: "Error fetching products" });
    }
  };
}

module.exports = new homeController();

const categoryModel = require("../../model/categoryModel");
const productModel = require("../../model/productModel");
const { responseReturn } = require("../../utils/response");

class homeController {
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
        {
          $lookup: {
            from: "categoryoffers",
            let: { category: "$category" }, // Pass the category field to the lookup
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$offerCategory", "$$category"] }, // Match the same category
                      { $eq: ["$isActive", true] }, // Offer must be active
                      { $gte: ["$expirationDate", new Date()] }, // Ensure not expired
                      { $lte: ["$startingDate", new Date()] }, // Ensure started
                    ],
                  },
                },
              },
              { $limit: 1 }, // Only get the most relevant active offer
            ],
            as: "categoryOffers", // Resulting field for offers
          },
        },
        {
          $addFields: {
            validOfferPercentage: {
              $cond: {
                if: { $gt: [{ $size: "$categoryOffers" }, 0] }, // Check if offer exists
                then: { $arrayElemAt: ["$categoryOffers.offerPercentage", 0] }, // Extract the percentage
                else: 0, // No valid offer
              },
            },
          },
        },
        {
          $project: { categoryOffers: 0 }, // Exclude full categoryOffers array
        },
        {
          $limit: 12,
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ]);

      const products = await productModel
        .find({ isDeleted: false })
        .limit(12)
        .sort({
          createdAt: -1,
        });
      // latest products
      const allProducts_1 = await productModel
        .find({ isDeleted: false })
        .limit(9)
        .sort({
          createdAt: -1,
        });
      const latest_product = this.formate_product(allProducts_1);
      //discounted products
      const allProducts_2 = await productModel
        .find({ isDeleted: false })
        .limit(9)
        .sort({
          discount: -1,
        });
      const discounted_product = this.formate_product(allProducts_2);

      //top rated products
      const allProducts_3 = await productModel
        .find({ isDeleted: false })
        .limit(9)
        .sort({
          rating: -1,
        });
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
      const product = await productModel.findOne({ slug });

      if (!product) {
        return responseReturn(res, 404, { error: "Product not found" });
      }

      const relatedProducts = await productModel
        .find({
          $and: [
            { isDeleted: false },
            { _id: { $ne: product._id } },
            { category: product.category },
          ],
        })
        .limit(12);

      // Fetch more products from the same seller, excluding the current product
      const moreProducts = await productModel
        .find({
          $and: [{ _id: { $ne: product._id } }, { sellerId: product.sellerId }],
        })
        .limit(3);

      // Return the response
      responseReturn(res, 200, {
        product,
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

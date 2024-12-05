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
        products,
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
          $group: {
            _id: null,
            low: { $min: "$price" },
            high: { $max: "$price" },
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
      console.log(priceRange);
      return responseReturn(res, 200, { priceRange, latest_product });
    } catch (error) {
      console.error("Error in get_price_range:", error);
      return responseReturn(res, 500, { message: "Internal Server Error" });
    }
  };
  query_products = async (req, res) => {
    const { lowPrice, highPrice, rating, category, sortPrice, pageNumber } =
      req.query;

    const lowPriceInt = parseInt(lowPrice, 10) || 0;
    const highPriceInt = parseInt(highPrice, 10) || Infinity;
    const ratingInt = parseInt(rating, 10) || 0;
    const pageNumberInt = parseInt(pageNumber, 10) || 1;
    const perPage = 9;
    const matchFilter = {
      isDeleted: false,
      price: { $gte: lowPriceInt, $lte: highPriceInt },
      ...(category && { category }),
      ...(rating && { rating: { $gte: ratingInt } }),
    };

    const sortFilter = {};
    if (sortPrice === "low-to-high") {
      sortFilter.price = 1;
    } else if (sortPrice === "high-to-low") {
      sortFilter.price = -1;
    } else {
      sortFilter.createdAt = -1;
    }

    const skip = (pageNumberInt - 1) * perPage;

    try {
      // Aggregation 1: Total count of matching products
      const totalCountResult = await productModel.aggregate([
        { $match: matchFilter },
        { $count: "totalCount" },
      ]);

      const totalCount = totalCountResult[0]?.totalCount || 0; // Default to 0 if no results

      // Aggregation 2: Fetch paginated products
      const totalProducts = await productModel.aggregate([
        { $match: matchFilter }, // Apply filters
        { $sort: sortFilter }, // Sort
        { $skip: skip }, // Skip for pagination
        { $limit: perPage }, // Limit for pagination
      ]);
      console.log(totalCount);
      // Return response
      return responseReturn(res, 200, { totalCount, totalProducts, perPage });
    } catch (error) {
      console.error("Error fetching products:", error);
      return responseReturn(res, 500, { message: "Error fetching products" });
    }
  };
}

module.exports = new homeController();

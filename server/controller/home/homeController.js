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
    console.log("in the query product");

    // Destructure query parameters and convert necessary values to integers
    const {
      lowPrice,
      highPrice,
      rating,
      category,
      sortPrice,
      pageNumber,
      pageSize,
    } = req.query;

    const lowPriceInt = parseInt(lowPrice, 10);
    const highPriceInt = parseInt(highPrice, 10);
    const ratingInt = parseInt(rating, 10);
    const pageNumberInt = parseInt(pageNumber, 10) || 1; // Default to 1 if not provided
    const pageSizeInt = parseInt(pageSize, 10) || 9; // Default to 9 if not provided

    // Match filter
    const matchFilter = {
      isDeleted: false,
      price: { $gte: lowPriceInt, $lte: highPriceInt },
      ...(category && { category }), // Add category filter if defined
      ...(rating && { rating: { $gte: ratingInt } }), // Rating filter (greater than or equal to provided rating)
    };

    const sortFilter = {}; // Default sorting criteria

    // Check for sorting condition based on price
    if (sortPrice === "low-to-high") {
      sortFilter.price = 1; // Ascending order for price (low to high)
    } else if (sortPrice === "high-to-low") {
      sortFilter.price = -1; // Descending order for price (high to low)
    } else {
      // Default sorting by createdAt (newest products first)
      sortFilter.createdAt = -1;
    }

    // Skip and Limit logic
    const skip = (pageNumberInt - 1) * pageSizeInt; // Skip products from previous pages
    const limit = pageSizeInt; // Limit the number of products per page

    try {
      // Aggregation pipeline
      const products = await productModel.aggregate([
        {
          $match: matchFilter, // Apply dynamic filters
        },
        {
          $sort: sortFilter, // Apply sorting (either by price or createdAt)
        },
        {
          $skip: skip, // Skip products for pagination
        },
        {
          $limit: limit, // Limit the number of products per page
        },
      ]);

      console.log(products);
      // Return the products
      return responseReturn(res, 200, { products });
    } catch (error) {
      console.error("Error fetching products:", error);
      return responseReturn(res, 500, { message: "Error fetching products" });
    }
  };
}

module.exports = new homeController();

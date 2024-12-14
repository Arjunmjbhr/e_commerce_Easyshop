const query_products = async (req, res) => {
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
      ...(searchValue ? [{ $match: { $text: { $search: searchValue } } }] : []),
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
      ...(searchValue ? [{ $match: { $text: { $search: searchValue } } }] : []),
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

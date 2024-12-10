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
        $addFiled:{
            "disconutedPrice":{$subtact:["$price",$multiply:["$price",$divide:["$discount",100]]]}
        }
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

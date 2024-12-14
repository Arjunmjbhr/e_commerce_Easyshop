const get_products = async (req, res) => {
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

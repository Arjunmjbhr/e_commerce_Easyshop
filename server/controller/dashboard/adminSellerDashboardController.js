const customerOrderModel = require("../../model/customerOrderModel");
const adminOrderModel = require("../../model/adminOrderModel");

class adminSellerDashboardController {
  get_admin_sales_data = async (req, res) => {
    console.log("In the admin controller", req.query);
    let { beginDate, lastDate, page } = req.query;
    const perPage = 10;

    page = parseInt(page) || 1;
    const skipPage = (page - 1) * perPage;

    try {
      // Ensure `beginDate` and `lastDate` are valid dates
      beginDate = new Date(beginDate);
      lastDate = new Date(lastDate);

      // Perform the aggregation query
      const salesOrders = await customerOrderModel.aggregate([
        {
          $match: {
            createdAt: { $gte: beginDate, $lte: lastDate },
            delivery_status: { $nin: ["cancelled", "pending"] },
          },
        },
        { $sort: { createdAt: -1 } }, // Sort by date, newest first
        { $skip: skipPage }, // Skip for pagination
        { $limit: perPage }, // Limit for pagination
      ]);

      // Count total documents matching the filter (without pagination)
      const totalOrder = await customerOrderModel.countDocuments({
        createdAt: { $gte: beginDate, $lte: lastDate },
        delivery_status: { $nin: ["cancelled", "pending"] },
      });
      console.log(totalOrder);

      if (salesOrders) {
        let totalProductSale = salesOrders.reduce((totalProductSale, order) => {
          let productCount = order["products"].reduce(
            (productCount, product) => {
              if (product.returnStatus !== "accepted") {
                return productCount + product.quantity;
              }
              return productCount;
            },
            0
          );
          return totalProductSale + productCount;
        }, 0);
        console.log(totalProductSale);
      }

      // Send the response
      res.status(200).json({
        totalOrder,
        salesOrders,
      });
    } catch (error) {
      console.error("Error fetching admin sales data:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
}

module.exports = new adminSellerDashboardController();

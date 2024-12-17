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

      // total order matching the filter (without pagination)
      const totalOrder = await customerOrderModel.countDocuments({
        createdAt: { $gte: beginDate, $lte: lastDate },
        delivery_status: { $nin: ["cancelled", "pending"] },
      });
      let totalProductSold = 0;
      let totalProductReturn = 0;
      let pendingOrder = 0;
      let totalSalesRevenue = 0;
      let couponUsedCount = 0;
      let couponUsedAmount = 0;
      if (salesOrders) {
        // total product sold
        totalProductSold = salesOrders.reduce((totalProductSold, order) => {
          let productCount = order["products"].reduce(
            (productCount, product) => {
              if (product.returnStatus !== "accepted") {
                return productCount + product.quantity;
              }
              return productCount;
            },
            0
          );
          return totalProductSold + productCount;
        }, 0);
        // total product return
        totalProductReturn = salesOrders.reduce((totalProductReturn, order) => {
          let productCount = order["products"].reduce(
            (productCount, product) => {
              if (product.returnStatus === "accepted") {
                return productCount + product.quantity;
              }
              return productCount;
            },
            0
          );
          return totalProductReturn + productCount;
        }, 0);
        // pending Order
        pendingOrder = salesOrders.reduce((pendingOrder, order) => {
          if (order.delivery_status === "placed") {
            return pendingOrder + 1;
          }
          return pendingOrder;
        }, 0);
        // total Sales Revenue
        totalSalesRevenue = salesOrders.reduce((revenue, order) => {
          if (order.delivery_status !== "cancelled") {
            return revenue + order.price;
          }
          return revenue;
        }, 0);
        // coupon Used Count
        couponUsedCount = salesOrders.reduce((count, order) => {
          if (order.delivery_status !== "cancelled") {
            if (order.couponAmount) return count + 1;
          }
          return count;
        }, 0);
        // coupon Used Amount
        couponUsedAmount = salesOrders.reduce((amount, order) => {
          if (order.delivery_status !== "cancelled") {
            if (order.couponAmount) return amount + order.couponAmount;
          }
          return amount;
        }, 0);
      }
      // to find out admin revenue
      const sellerOrder = await adminOrderModel.aggregate([
        {
          $match: {
            createdAt: { $gte: beginDate, $lte: lastDate },
            delivery_status: { $nin: ["cancelled", "pending"] },
          },
        },
      ]);
      let totalSallerRevenue = 0;
      if (sellerOrder.length > 0) {
        totalSallerRevenue = sellerOrder.reduce((revenue, order) => {
          if (order.delivery_status !== "cancelled") {
            return revenue + order.price;
          }
          return revenue;
        }, 0);
      }

      const totalAdminRevenue = totalSalesRevenue - totalSallerRevenue;

      // Send the response
      console.log("total order", totalOrder);
      console.log("total product sold", totalProductSold);
      console.log("total product return", totalProductReturn);
      console.log("total pending order", pendingOrder);
      console.log("total revenue ", totalSalesRevenue);
      console.log("coupon count ", couponUsedCount);
      console.log("coupon amount", couponUsedAmount);
      console.log("seller revenue", totalSallerRevenue);
      console.log("totoal admin revenue", totalAdminRevenue);
      // console.log(sellerRevenue);

      res.status(200).json({
        salesOrders,
        totalOrder,
        totalProductSold,
        totalProductReturn,
        pendingOrder,
        totalSalesRevenue,
        couponUsedCount,
        couponUsedAmount,
        totalAdminRevenue,
      });
    } catch (error) {
      console.error("Error fetching admin sales data:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
}

module.exports = new adminSellerDashboardController();

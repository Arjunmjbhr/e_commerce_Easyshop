const customerOrderModel = require("../../model/customerOrderModel");
const mongoose = require("mongoose");
const { responseReturn } = require("../../utils/response");

class dashboardController {
  get_dashboard_data = async (req, res) => {
    const { userId } = req.params;
    let pendingOrder = 0;
    let cancelledOrder = 0;
    let totalOrder = 0;

    try {
      // Fetch recent orders (limit to 5)
      const recentOrders = await customerOrderModel
        .find({
          customerId: new mongoose.Types.ObjectId(userId),
        })
        .sort({ updatedAt: -1 })
        .limit(5);

      // Aggregate orders by delivery status
      const orderStats = await customerOrderModel.aggregate([
        {
          $match: {
            customerId: new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $group: {
            _id: "$delivery_status", // Group by delivery status
            count: { $sum: 1 }, // Count the number of orders
          },
        },
      ]);

      // Process aggregated data
      for (let ord of orderStats) {
        if (ord._id === "cancelled") {
          cancelledOrder = ord.count;
        } else if (ord._id === "pending") {
          pendingOrder = ord.count;
        }
        totalOrder += ord.count; // Add the count to total orders
      }

      // Respond to the client with the data
      return responseReturn(res, 200, {
        recentOrders,
        pendingOrder,
        totalOrder,
        cancelledOrder,
      });
    } catch (error) {
      console.error("Error in get_dashboard_data:", error);
      return responseReturn(res, 500, { error: "Internal Server Error" });
    }
  };
}

module.exports = new dashboardController();

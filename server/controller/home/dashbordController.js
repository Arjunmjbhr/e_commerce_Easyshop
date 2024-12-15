const customerOrderModel = require("../../model/customerOrderModel");
const mongoose = require("mongoose");
const { responseReturn } = require("../../utils/response");
const walletModel = require("../../model/walletModel");
const walletTransactionModel = require("../../model/WalletTransactionModel");

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
  get_wallet_data = async (req, res) => {
    console.log("In the get wallet controller", req.params);
    const { userId } = req.params;

    try {
      // Fetch wallet details
      const wallet = await walletModel.findOne({ userId });
      // Check if wallet exists
      if (!wallet) {
        return responseReturn(res, 404, { message: "Wallet not found" });
      }
      // Fetch wallet transactions
      const walletTransactions = await walletTransactionModel
        .find({
          walletId: wallet._id,
        })
        .sort({
          createdAt: -1,
        });
      // Return wallet balance and transactions
      const { balance } = wallet;
      return responseReturn(res, 200, {
        walletBalance: balance,
        walletTransactions: walletTransactions || [],
      });
    } catch (error) {
      console.error("Error in the get wallet data controller:", error.message);
      return responseReturn(res, 500, {
        message: "An error occurred while fetching wallet data",
      });
    }
  };
}

module.exports = new dashboardController();

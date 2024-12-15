const router = require("express").Router();
const dashboardController = require("../../controller/home/dashbordController");
const checkUserStatus = require("../../middleweres/authCustomerMiddleware");

router.get(
  "/home/customer/get-dashboard-data/:userId",
  checkUserStatus,
  dashboardController.get_dashboard_data
);
router.get(
  "/home/customer/get-wallet-data/:userId",
  checkUserStatus,
  dashboardController.get_wallet_data
);

module.exports = router;

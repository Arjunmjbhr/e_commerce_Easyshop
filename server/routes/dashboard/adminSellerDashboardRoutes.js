const router = require("express").Router();
const adminSellerDashboardController = require("../../controller/dashboard/adminSellerDashboardController");

router.get(
  "/admin/get-admin-sales-data",
  adminSellerDashboardController.get_admin_sales_data
);

module.exports = router;

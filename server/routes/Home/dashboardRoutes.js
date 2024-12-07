const router = require("express").Router();
const dashboardController = require("../../controller/home/dashbordController");

router.get(
  "/home/customer/get-dashboard-data/:userId",
  dashboardController.get_dashboard_data
);

module.exports = router;

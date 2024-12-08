const express = require("express");
const router = express();
const addressController = require("../../controller/home/addressController");

router.post(
  "/home/customer/add_address/:userId",
  addressController.add_address
);

module.exports = router;

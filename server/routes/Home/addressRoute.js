const express = require("express");
const router = express();
const addressController = require("../../controller/home/addressController");

router.post(
  "/home/customer/add_address/:userId",
  addressController.add_address
);
router.post(
  "/home/customer/update_address/:addressId",
  addressController.update_address
);
router.delete(
  "/home/customer/delete-address/:addressId",
  addressController.delete_address
);

module.exports = router;

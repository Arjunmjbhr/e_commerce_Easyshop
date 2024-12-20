const router = require("express").Router();
const sellerControler = require("../../controller/dashboard/sellerController");

router.post(
  "/seller/update-seller-profile-info",
  sellerControler.update_seller_profile_info
);
router.get("/admin/request-seller-get", sellerControler.get_seller_request);

module.exports = router;

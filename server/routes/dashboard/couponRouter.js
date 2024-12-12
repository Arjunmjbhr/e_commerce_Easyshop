const router = require("express").Router();
const couponController = require("../../controller/dashboard/couponController");

router.post("/admin/add-coupon", couponController.add_coupon);
router.get("/admin/get-coupon?", couponController.get_coupon);
module.exports = router;

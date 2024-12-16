const Razorpay = require("razorpay");
const { responseReturn } = require("../../utils/response");
const customerOrderModle = require("../../model/customerOrderModel");

class PaymentController {
  constructor() {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });
  }

  create_razorpay_payment_order = async (req, res) => {
    const { orderId } = req.params;

    if (!orderId) {
      return responseReturn(res, 400, {
        error: "Invalid input. 'orderId' is required.",
      });
    }

    let order;
    try {
      order = await customerOrderModle.findById(orderId);
      if (!order) {
        return responseReturn(res, 404, {
          error: "Order not found",
        });
      }
    } catch (dbError) {
      console.error("Database error:", dbError);
      return responseReturn(res, 500, {
        error: "Internal server error while fetching order",
      });
    }

    const { price } = order;
    if (!price || price <= 0) {
      return responseReturn(res, 400, {
        error: "Invalid order price",
      });
    }

    const options = {
      amount: price * 100, // Convert to paise
      currency: "INR",
      receipt: `${orderId}_${Date.now()}`,
      notes: {
        orderId,
        createdBy: "Backend API",
      },
    };

    try {
      const razorpayOrder = await this.razorpay.orders.create(options);
      console.log("Razorpay order created successfully:", razorpayOrder);

      return responseReturn(res, 200, {
        message: "Order created successfully",
        razorpayOrder,
      });
    } catch (error) {
      console.error("Error while creating Razorpay order:", error);
      return responseReturn(res, 500, {
        error: "Error while creating payment order",
      });
    }
  };
}

module.exports = new PaymentController();

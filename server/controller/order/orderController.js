const moment = require("moment");
const adminOrderModel = require("../../model/adminOrderModel");
const customerOrderModel = require("../../model/customerOrderModel");
const cartModel = require("../../model/cartModel");
const { responseReturn } = require("../../utils/response");
const {
  mongo: { ObjectId },
} = require("mongoose");
const customerModel = require("../../model/customerModel");

class orderController {
  ////////////////////////////customer order/////////////////////////////////////

  paymentCheck = async (id) => {
    try {
      const order = await customerOrderModel.findById(id);
      if (order.payment_status === "unpaid") {
        await customerOrderModel.findByIdAndUpdate(id, {
          delivery_status: "cancelled",
        });
        await adminOrderModel.updateMany(
          {
            orderId: id,
          },
          {
            delivery_status: "cancelled",
          }
        );
      }
      return true;
    } catch (error) {
      console.log(error);
    }
  };
  // End method
  place_order = async (req, res) => {
    console.log("product in the controller");
    const { price, products, shipping_fee, shippingInfo, userId } = req.body;

    let adminOrderData = [];
    let cartId = [];
    const tempDate = moment(Date.now()).format("LLL");

    // Create customer order product list with quantities
    let customerOrderProduct = [];
    for (let i = 0; i < products.length; i++) {
      const pro = products[i].products;
      for (let j = 0; j < pro.length; j++) {
        const tempCustomerProduct = {
          ...pro[j].productInfo,
          quantity: pro[j].quantity,
        };
        customerOrderProduct.push(tempCustomerProduct);
        if (pro[j]._id) {
          cartId.push(pro[j]._id);
        }
      }
    }
    cartId = [...new Set(cartId)]; // Remove duplicate IDs

    try {
      // Create customer order
      const order = await customerOrderModel.create({
        customerId: userId,
        shippingInfo,
        products: customerOrderProduct,
        price: price + shipping_fee,
        payment_status: "unpaid",
        delivery_status: "pending",
        date: tempDate,
      });

      // Create admin order data
      for (let i = 0; i < products.length; i++) {
        const productList = products[i].products;
        const pri = products[i].price;
        const sellerId = products[i].sellerId;
        let storeProducts = [];

        for (let j = 0; j < productList.length; j++) {
          const tempProduct = {
            ...productList[j].productInfo,
            quantity: productList[j].quantity,
          };
          storeProducts.push(tempProduct);
        }

        adminOrderData.push({
          orderId: order._id,
          sellerId,
          products: storeProducts,
          price: pri,
          payment_status: "unpaid",
          shippingInfo: "Easy Main Warehouse",
          delivery_status: "pending",
          date: tempDate,
        });
      }

      // Insert admin orders
      await adminOrderModel.insertMany(adminOrderData);

      // Delete cart items
      for (let k = 0; k < cartId.length; k++) {
        await cartModel.findByIdAndDelete(cartId[k]);
      }
      // setTimeout(() => {
      //   this.paymentCheck(order.id);
      // }, 15000);

      return responseReturn(res, 200, {
        message: "Order placed successfully",
        orderId: order._id,
      });
    } catch (error) {
      console.log("Error while placing order:", error.stack);
      return responseReturn(res, 500, {
        error: "An error occurred while placing the order",
      });
    }
  };
  // End Method
  get_orders = async (req, res) => {
    const { customerId, status } = req.params;
    try {
      const queryString =
        status === "all"
          ? { customerId: new ObjectId(customerId) }
          : { customerId: new ObjectId(customerId), delivery_status: status };
      const orders = await customerOrderModel
        .find(queryString)
        .sort({ updatedAt: -1 });

      return responseReturn(res, 200, { orders });
    } catch (error) {}
  };
  // End Method
  get_order_details = async (req, res) => {
    const { orderId } = req.params;
    try {
      const order = await customerOrderModel.findById(orderId);
      return responseReturn(res, 200, { order });
    } catch (error) {
      console.log(
        "erro while fetching the specific order details",
        error.message
      );
    }
  };
  // End Method
  cancel_order = async (req, res) => {
    const { orderId } = req.params;

    try {
      // Update the delivery_status to "cancelled"
      const order = await customerOrderModel.findByIdAndUpdate(
        orderId,
        { delivery_status: "cancelled" },
        { new: true } // Returns the updated document
      );
      const orderAdmin = await adminOrderModel.updateMany(
        { orderId: new ObjectId(orderId) },
        { delivery_status: "cancelled" },
        { new: true } // Returns the updated document
      );

      // Handle case where the order is not found
      if (!order && !orderAdmin) {
        return responseReturn(res, 404, {
          error: "Failed to cancel the order",
        });
      }

      // Successful response
      return responseReturn(res, 200, {
        message: "Order canceled successfully",
        order,
      });
    } catch (error) {
      console.error("Failed to cancel the order:", error.message);

      // Internal server error response
      return responseReturn(res, 500, {
        error: "Internal server error. Failed to cancel the order.",
      });
    }
  };

  ////////////////////////////////// Admin order///////////////////////////////////

  get_admin_order = async (req, res) => {
    let { page, searchValue, perPage } = req.query;

    // Validate and parse query parameters
    page = parseInt(page) || 1;
    perPage = parseInt(perPage) || 5;
    const skipPage = perPage * (page - 1);

    try {
      // Build the match stage
      let matchStage = {};
      if (searchValue) {
        if (ObjectId.isValid(searchValue)) {
          matchStage = { orderId: new ObjectId(searchValue) };
        } else {
          return responseReturn(res, 400, {
            error: "Invalid Order ID format.",
          });
        }
      }

      // Fetch paginated orders
      const orders = await customerOrderModel.aggregate([
        { $match: matchStage },
        {
          $lookup: {
            from: "adminorders",
            localField: "_id",
            foreignField: "orderId",
            as: "suborders",
          },
        },
        { $sort: { createdAt: -1 } },
        { $skip: skipPage },
        { $limit: perPage },
      ]);

      // Fetch total count
      const totalOrder = await customerOrderModel.aggregate([
        { $match: matchStage },
        {
          $lookup: {
            from: "adminorders",
            localField: "_id",
            foreignField: "orderId",
            as: "suborders",
          },
        },
        { $count: "total" },
      ]);

      return responseReturn(res, 200, {
        orders,
        totalOrder: totalOrder[0]?.total || 0,
      });
    } catch (error) {
      console.error("error in get admin order", error.message);
      responseReturn(res, 500, {
        message: "An error occurred while fetching orders.",
      });
    }
  };
  // End Method
  get_admin_specific_order = async (req, res) => {
    const { orderId } = req.params;

    try {
      // Validate ObjectId
      if (!ObjectId.isValid(orderId)) {
        return responseReturn(res, 400, { error: "Invalid Order ID format" });
      }

      // Aggregate to fetch the order and its suborder details
      const order = await customerOrderModel.aggregate([
        {
          $match: { _id: new ObjectId(orderId) },
        },
        {
          $lookup: {
            from: "adminorders",
            localField: "_id",
            foreignField: "orderId",
            as: "suborders",
          },
        },
      ]);

      if (!order.length) {
        return responseReturn(res, 404, { error: "Order not found" });
      }
      console.log(order);

      responseReturn(res, 200, { order: order[0] });
    } catch (error) {
      console.error("Error in get_admin_specific_order:", error.message);
      responseReturn(res, 500, {
        message: "An error occurred while fetching the order.",
      });
    }
  };
  // End Method
  admin_order_status_update = async (req, res) => {
    console.log("in the order status update");
    console.log(req.body);
    console.log(req.params);
    const { orderId } = req.params;
    const { status } = req.body;
    try {
      // Update the delivery_status to "cancelled"
      const order = await customerOrderModel.findByIdAndUpdate(
        orderId,
        { delivery_status: status },
        { new: true } // Returns the updated document
      );
      const orderAdmin = await adminOrderModel.updateMany(
        { orderId: new ObjectId(orderId) },
        { delivery_status: status },
        { new: true } // Returns the updated document
      );

      // Successful response
      return responseReturn(res, 200, {
        message: "Order status changed successfully",
      });
    } catch (error) {
      console.error("Failed to cancel the order:", error.message);
      return responseReturn(res, 500, {
        error: "Internal server error. Failed to cancel the order.",
      });
    }
  };
}

module.exports = new orderController();

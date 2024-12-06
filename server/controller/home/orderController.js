const moment = require("moment");
const adminOrderModel = require("../../model/adminOrderModel");
const customerOrderModel = require("../../model/customerOrderModel");
const cartModel = require("../../model/cartModel");
const { responseReturn } = require("../../utils/response");

class orderController {
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
  // end method
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
      setTimeout(() => {
        this.paymentCheck(order.id);
      }, 15000);

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
}

module.exports = new orderController();

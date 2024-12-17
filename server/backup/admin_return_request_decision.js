const admin_return_request_decision = async (req, res) => {
  console.log("In the admin return request decision controller");
  const { orderId, productId } = req.params;
  console.log(req.body);
  const { returnOption, returnAmount } = req.body;

  try {
    // Update in customerOrderModel
    const updatedOrder = await customerOrderModel.findOneAndUpdate(
      {
        _id: orderId,
        "products._id": productId,
      },
      {
        $set: {
          "products.$[product].returnStatus": returnOption,
        },
      },
      {
        new: true, // Return updated document
        arrayFilters: [{ "product._id": productId }],
      }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        error: "Order or Product not found in customer orders",
      });
    }

    // Update in adminOrderModel
    const updatedOrderInAdmin = await adminOrderModel.findOneAndUpdate(
      {
        orderId,
        "products._id": productId,
      },
      {
        $set: {
          "products.$[product].returnStatus": returnOption,
        },
      },
      {
        new: true,
        arrayFilters: [{ "product._id": productId }],
      }
    );

    if (!updatedOrderInAdmin) {
      return res.status(404).json({
        error: "Order or Product not found in admin orders",
      });
    }
    // wallet amount addition

    if (returnOption === "accepted") {
      const { customerId } = updatedOrder;
      const error = await this.credited_to_wallet(
        customerId,
        returnAmount,
        "Return Product",
        orderId
      );
      if (error) {
        return responseReturn(res, 404, {
          error: "error while amount returned to wallet",
        });
      }
    }
    // Combined success response
    res.status(200).json({
      message: "Product return status updated successfully ",
      customerOrder: updatedOrder,
      adminOrder: updatedOrderInAdmin,
    });
  } catch (error) {
    console.error("Error updating product return status:", error.message);
    res.status(500).json({
      error: "An error occurred while updating the product return status",
    });
  }
};

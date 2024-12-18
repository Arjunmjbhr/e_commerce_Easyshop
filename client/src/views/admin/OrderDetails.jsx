import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  get_admin_specific_order,
  admin_order_status_update,
  messageClear,
  admin_return_request_decision,
} from "../../store/Reducers/orderReducer";
import ConfirmModal from "../../components/ConfirmModal";
import { toast } from "react-hot-toast";

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { order, successMessage, errorMessage } = useSelector(
    (store) => store.order
  );
  const [status, setStatus] = useState(order.delivery_status);
  const [modalClose, SetModalClose] = useState(true);
  const [returnOption, setReturnOption] = useState({
    productId: "",
    returnOption: "",
    returnAmount: "",
    couponId: "",
    couponAmount: "",
  });

  const [returnModlalClose, setReturnModalClose] = useState(true);

  useEffect(() => {
    dispatch(get_admin_specific_order(orderId));
  }, [dispatch, orderId, successMessage]);

  // fuction for updatin the status
  const status_update = (orderId) => {
    if (
      order.delivery_status === "cancelled" ||
      order.delivery_status === "delivered"
    ) {
      return toast.error("order completed! further action disabled");
    }
    if (order.delivery_status !== status) {
      const data = {
        orderId,
        info: {
          status,
        },
      };
      dispatch(admin_order_status_update(data));
    } else {
      toast.error("delivery status previous and current is same");
    }
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);

  return (
    <div className=" w-[95%] ml-4 px-4 lg:px-10 pb-6  min-h-screen">
      {/* Header Section */}
      <div className="w-full p-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg text-white">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-wide">Order Details</h2>
          <div className="flex gap-3">
            <select
              onChange={(e) => setStatus(e.target.value)}
              value={status}
              className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
            >
              <option value="processing">Processing</option>
              <option value="warehouse">Warehouse</option>
              <option value="dispatched">Dispatched</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <div
              onClick={() => SetModalClose(false)}
              className="bg-red-700 px-3 py2 flex items-center rounded-lg text-white cursor-pointer"
            >
              Update Status
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <p className="text-gray-600">
            <strong className="text-gray-800">Deliver To: </strong>
          </p>

          <p className="text-gray-600 text-sm mt-2">
            {order?.shippingInfo?.name}
            {order?.shippingInfo?.address}, {order?.shippingInfo?.province},
            {order?.shippingInfo?.city}, {order?.shippingInfo?.area}
          </p>
          <div className="mt-4 flex flex-col gap-3">
            <p className="text-gray-600 mt-2 flex flex-col">
              <strong className="text-gray-800">Order Date :</strong>
              <span>{order?.date}</span>
            </p>
            <p className="text-gray-600">
              <strong className="text-gray-800">Payment Status :</strong>
              <span>{order?.payment_status}</span>
            </p>
            <p className="text-gray-600 mt-2">
              <strong className="text-gray-800"> Sold Price :</strong> ₹
              {order?.price}
            </p>
            <p className="text-gray-600 mt-2">
              <strong className="text-gray-800"> Coupon Applied:</strong> ₹
              {order?.couponAmount}
            </p>
            <p className="text-gray-600 mt-2">
              <strong className="text-gray-800"> Deliver charge:</strong> ₹
              {order?.shippingFee}
            </p>

            <p className="text-gray-600 mt-2">
              <strong className="text-gray-800">Total products:</strong>{" "}
              {order?.products?.length}
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:col-span-2 space-y-8">
          {/* Suborders Section */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Suborders
            </h3>
            {order?.suborders?.map((sub, i) => {
              return (
                <div key={i} className="mb-6">
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <h4 className="font-semibold text-gray-700">
                      Seller {i + 1} {"-"}
                      {sub?.sellerId}
                    </h4>
                    <div className="flex gap-4">
                      <span>Order Status:</span>
                      <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-lg shadow-sm text-sm">
                        {sub.delivery_status}
                      </span>
                    </div>
                  </div>
                  {sub.products?.map((p, j) => {
                    const {
                      images,
                      name,
                      brand,
                      quantity,
                      _id,
                      price,
                      validOfferPercentage,
                      discount,
                      returnStatus,
                    } = p;

                    const discountOrOffer =
                      discount > validOfferPercentage
                        ? discount
                        : validOfferPercentage;
                    // total price in the order
                    const discountedPrice =
                      price -
                      Math.floor((price * discountOrOffer) / 100).toFixed(2);

                    return (
                      <div
                        key={_id}
                        className="flex border-2 my-1 items-center gap-4 p-4 bg-gray-50 rounded-lg hover:shadow-md transition transform hover:-translate-y-1"
                      >
                        <img
                          className="w-16 h-16 object-cover rounded-md shadow-sm"
                          src={images[0]}
                          alt={name}
                        />
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {name}
                          </h4>
                          <p className="text-gray-600">
                            <strong>Brand:</strong> {brand}
                          </p>
                          <p className="text-gray-600">
                            <strong>Quantity:</strong> {quantity}
                          </p>
                          <p className="text-gray-600">
                            <strong>Price:₹</strong>{" "}
                            {discountedPrice * quantity}
                          </p>
                          {returnStatus && (
                            <p className="text-gray-600">
                              <strong>Return Status:</strong> {returnStatus}
                            </p>
                          )}
                          {/* return order management button */}
                          {returnStatus === "requested" && (
                            <div className="flex gap-3 mt-3">
                              <h2>Return Request</h2>
                              <div
                                onClick={() => {
                                  setReturnOption({
                                    productId: _id,
                                    returnOption: "rejected",
                                    returnAmount: discountedPrice,
                                    couponId: order.couponId,
                                    couponAmount: order.couponAmount,
                                  });
                                  setReturnModalClose(false);
                                }}
                                className="bg-red-600 text-sm cursor-pointer rounded-lg text-white px-2 py-1 hover:hover:bg-red-700 transition duration-200 ease-in-out"
                              >
                                Reject
                              </div>
                              <div
                                onClick={() => {
                                  setReturnOption({
                                    productId: _id,
                                    returnOption: "accepted",
                                    returnAmount: discountedPrice,
                                    couponId: order.couponId,
                                    couponAmount: order.couponAmount,
                                  });
                                  setReturnModalClose(false);
                                }}
                                className="bg-green-600 text-sm cursor-pointer rounded-lg text-white px-2 py-1 hover:hover:bg-green-700 transition duration-200 ease-in-out"
                              >
                                Accept
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div>
        {!returnModlalClose && (
          <div>
            <ConfirmModal
              confimFunction={() =>
                dispatch(
                  admin_return_request_decision({
                    orderId,
                    productId: returnOption.productId,
                    info: returnOption,
                  })
                )
              }
              SetModalClose={setReturnModalClose}
              message="Please confirm to place action in  Return request"
            />
          </div>
        )}
      </div>
      <div>
        {!modalClose && (
          <ConfirmModal
            confimFunction={() => status_update(orderId)}
            SetModalClose={SetModalClose}
            message="Please confirm to change order status"
          />
        )}
      </div>
    </div>
  );
};

export default OrderDetails;

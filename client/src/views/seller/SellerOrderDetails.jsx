import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  get_seller_specific_order,
  seller_order_status_update,
  messageClear,
} from "../../store/Reducers/orderReducer";
import ConfirmModal from "../../components/ConfirmModal";
import { toast } from "react-hot-toast";

const SellerOrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();

  // subscribing to the store
  const { order, successMessage, errorMessage } = useSelector(
    (store) => store.order
  );
  const { userInfo } = useSelector((store) => store.auth);

  const [status, setStatus] = useState(order.delivery_status);
  const [modalClose, SetModalClose] = useState(true);

  useEffect(() => {
    const data = {
      sellerId: userInfo._id,
      adminOrderId: orderId,
    };
    dispatch(get_seller_specific_order(data));
  }, [dispatch, orderId, successMessage]);

  // fuction for updatin the status
  const status_update = (orderId) => {
    if (order.delivery_status !== status) {
      const data = {
        adminOrderId: orderId,
        info: {
          status,
        },
      };
      dispatch(seller_order_status_update(data));
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
    <div className=" w-[95%] ml-4 px-4 lg:px-10 py-6  min-h-screen">
      {/* Header Section */}
      <div className="w-full p-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg text-white">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-wide">Order Details</h2>
          {(order.delivery_status === "processing" ||
            order.delivery_status === "placed") && (
            <div className="flex gap-3">
              <select
                onChange={(e) => setStatus(e.target.value)}
                value={status}
                className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
              >
                <option value="deliverdAtWarehouse">
                  Deliverd at Warehouse
                </option>
                <option value="processing">Processing</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <div
                onClick={() => SetModalClose(false)}
                className="bg-red-700 px-3 py2 flex items-center rounded-lg text-white cursor-pointer"
              >
                Update Status
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <p className="text-gray-600">
            <strong className="text-gray-800">Deliver To: </strong>
            {order?.shippingInfo?.name}
          </p>
          <p className="text-gray-600 mt-2">{order?.shippingInfo},</p>
          <div className="mt-4 flex flex-col gap-3">
            <p className="text-gray-600">
              <strong className="text-gray-800">Payment Status:</strong>{" "}
              {order?.payment_status}
            </p>
            <p className="text-gray-600 mt-2">
              <strong className="text-gray-800"> Total Price :</strong> ₹
              {order?.price}
            </p>
            <p className="text-gray-600 mt-2">
              <strong className="text-gray-800">Order Date :</strong> <br />
              {order?.date}
            </p>
            <p className="text-gray-600 mt-2">
              <strong className="text-gray-800"> product quantity:</strong>{" "}
              {order?.products?.length}
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:col-span-2 space-y-8">
          {/* Suborders Section */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Order Details
            </h3>

            <div className="mb-6">
              <div className="flex items-center justify-between gap-4 mb-3">
                <h4 className="font-semibold text-gray-700 uppercase">
                  order Id -{order?.orderId}
                </h4>
                <div className="flex gap-4">
                  <span>Order Status:</span>
                  <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-lg shadow-sm text-sm">
                    {order?.delivery_status}
                  </span>
                </div>
              </div>

              {order?.products?.map((item) => (
                <div
                  key={item?._id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:shadow-md transition transform hover:-translate-y-1"
                >
                  <img
                    className="w-16 h-16 object-cover rounded-md shadow-sm"
                    src={item?.images[0]}
                    alt={item?.name}
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {item?.name}
                    </h4>
                    <p className="text-gray-600">
                      <strong>Brand:</strong> {item?.brand}
                    </p>
                    <p className="text-gray-600">
                      <strong>Quantity:</strong> {item?.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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

export default SellerOrderDetails;

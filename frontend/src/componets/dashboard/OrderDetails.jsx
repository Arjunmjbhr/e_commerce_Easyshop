import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  get_order_details,
  cancel_order,
  messageClear,
} from "../../store/reducers/orderReducer";
import { Link } from "react-router-dom";
import ConfirmModal from "../ConfirmModal";
import { toast } from "react-hot-toast";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const { myOrder, errorMessage, successMessage } = useSelector(
    (store) => store.order
  );
  const [modalClose, SetModalClose] = useState(true);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(get_order_details(orderId));
  }, [dispatch, orderId, successMessage]);
  // cancel order
  const cancelOrder = (id) => {
    dispatch(cancel_order(id));
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [errorMessage, successMessage, dispatch]);

  const redirect = (order) => {
    let items = 0;
    for (let i = 0; i < order.products.length; i++) {
      items += order.products[i].quantity;
    }
    navigate("/payment", {
      state: {
        price: order.price,
        items,
        orderId: order._id,
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100 rounded-lg shadow-xl">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        {/* Order Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Order ID: #{myOrder._id}
            </h2>
            <p className="text-sm text-gray-500">{myOrder.date}</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-green-600">
              ${myOrder.price}
            </p>
            <p
              className={`px-3 py-1 text-xs rounded-full ${
                myOrder.payment_status === "paid"
                  ? "bg-green-300 text-green-800"
                  : "bg-red-300 text-red-800"
              }`}
            >
              {myOrder.payment_status}
            </p>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Deliver To:</h3>
            <p className="text-gray-600">{myOrder.shippingInfo?.name}</p>
            <p className="text-sm text-gray-500">
              {myOrder.shippingInfo?.address}, {myOrder.shippingInfo?.province},{" "}
              {myOrder.shippingInfo?.city}
            </p>
          </div>

          {/* Order Status */}
          <div className="flex items-center gap-4">
            <h3 className="text-lg  font-semibold text-gray-700">
              Order Status
            </h3>
            <p
              className={`py-1 text-xs w-[80px] px-3 rounded-md ${
                myOrder.delivery_status === "paid"
                  ? "bg-green-300 text-green-800"
                  : "bg-red-300 text-red-800"
              }`}
            >
              {myOrder.delivery_status}
            </p>
          </div>
        </div>

        {/* Order Products */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-700">
            Order Products
          </h3>
          <div className="space-y-6 mt-4">
            {myOrder.products?.map((product, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm"
              >
                <div className="flex gap-4">
                  <img
                    className="w-20 h-20 object-cover rounded-md"
                    src={product.images[0]}
                    alt={product.name}
                  />
                  <div className="flex flex-col justify-start">
                    <Link
                      to="#"
                      className="text-lg font-semibold text-blue-600 hover:underline"
                    >
                      {product.name}
                    </Link>
                    <p className="text-sm text-gray-600">
                      Brand: {product.brand}
                    </p>
                    <p className="text-sm text-gray-600">
                      Quantity: {product.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-lg font-semibold text-green-600">
                    $
                    {(
                      product.price -
                      Math.floor((product.price * product.discount) / 100)
                    ).toFixed(2)}
                  </p>
                  <p className="line-through text-sm text-gray-500">
                    ${product.price}
                  </p>
                  <p className="text-xs text-gray-500">-{product.discount}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        {myOrder.delivery_status !== "cancelled" &&
          myOrder.delivery_status !== "delivered" && (
            <div className="mt-8 flex gap-6 justify-end">
              {myOrder.payment_status !== "paid" && (
                <button
                  className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-200 ease-in-out"
                  onClick={() => redirect(myOrder)}
                >
                  Make Payment
                </button>
              )}
              {
                <button
                  onClick={() => SetModalClose(false)}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-200 ease-in-out"
                >
                  Cancel Order
                </button>
              }
            </div>
          )}
        {/* Modal */}
        {!modalClose && (
          <div>
            <ConfirmModal
              message="Please confirm to cancel this order"
              setConfirmSubmit={setConfirmSubmit}
              SetModalClose={SetModalClose}
              confimFunction={() => cancelOrder(orderId)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;

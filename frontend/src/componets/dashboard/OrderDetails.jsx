import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  get_order_details,
  cancel_order,
  messageClear,
  return_product,
} from "../../store/reducers/orderReducer";
import { Link } from "react-router-dom";
import ConfirmModal from "../ConfirmModal";
import { toast } from "react-hot-toast";
import { downloadPDF } from "../../utils/downloadInvoice";
import ProductReview from "./ProductReview";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const { myOrder, errorMessage, successMessage } = useSelector(
    (store) => store.order
  );
  const [modalClose, SetModalClose] = useState(true);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const navigate = useNavigate();
  const [returnModalClose, SetReturnModalClose] = useState(true);
  const [returnModalProductId, setReturnModalProductId] = useState(null);

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
  const downloadPdf = () => {
    console.log("download pfd");
    downloadPDF(myOrder);
  };

  return (
    <div className="max-w-7xl mx-auto   rounded-lg ">
      <div className="bg-white p-8  rounded-lg shadow-lg">
        {/* Order Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Order ID: #{myOrder._id}
            </h2>
            <p className="text-sm text-gray-500">{myOrder.date}</p>
            {myOrder.delivery_status === "delivered" && (
              <div
                onClick={downloadPdf}
                className="bg-zinc-600 text-white cursor-pointer mt-3 px-2 py-1 rounded-md w-[70px]"
              >
                Invoice
              </div>
            )}
          </div>
          <div>
            <p className="text-lg font-semibold text-green-600">
              ₹{myOrder.price}
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
              Order/Delivery Status
            </h3>
            <p
              className={`py-1 text-xs w-[80px] px-3 rounded-md ${
                myOrder.delivery_status !== "cancelled"
                  ? "bg-green-300 text-green-800"
                  : "bg-red-300 text-red-800"
              }`}
            >
              {myOrder.delivery_status}
            </p>
          </div>
          <div>
            <h3 className="text-lg  font-semibold text-gray-700 mb-2">
              Amount Details
            </h3>
            <div className="flex gap-3">
              <div className="text-sm flex flex-col gap-2">
                <h6>Product price</h6>
                {myOrder.couponAmount !== 0 && <h6>Coupon Amount</h6>}
                <h6>Delivery Charge</h6>
                <h6>Total</h6>
              </div>
              <div className="text-sm  flex flex-col gap-2">
                <h6>
                  : ₹{" "}
                  {myOrder.price - myOrder.shippingFee + myOrder?.couponAmount}
                </h6>
                {myOrder.couponAmount !== 0 && (
                  <h6>: -₹{myOrder.couponAmount}</h6>
                )}
                <h6>: +₹{myOrder.shippingFee}</h6>
                <h6>: ₹{myOrder.price}</h6>
              </div>
            </div>
          </div>
        </div>

        {/* Order Products */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-700">
            Order Products
          </h3>
          <div className="space-y-6 mt-4">
            {myOrder.products?.map((product) => {
              const {
                _id,
                images,
                name,
                brand,
                quantity,
                discount,
                price,
                validOfferPercentage,
                returnStatus,
              } = product;

              const discountOrOffer =
                discount > validOfferPercentage
                  ? discount
                  : validOfferPercentage;
              // total price in the order
              const discountedPrice =
                price - Math.floor((price * discountOrOffer) / 100).toFixed(2);

              return (
                <div
                  key={_id}
                  className="flex justify-between items-center bg-gray-200 p-4 rounded-lg shadow-sm"
                >
                  <div className="flex gap-4">
                    <img
                      className="w-20 h-20 object-cover rounded-md"
                      src={images[0]}
                      alt={name}
                    />
                    <div className="flex flex-col justify-start">
                      <Link
                        to="#"
                        className="text-lg font-semibold text-blue-600 hover:underline"
                      >
                        {name}
                      </Link>
                      <p className="text-sm text-gray-600">Brand: {brand}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {quantity}
                      </p>
                      {returnStatus !== "" && (
                        <p className="text-sm text-gray-600">
                          Return status: {returnStatus}
                        </p>
                      )}
                      {!product.isRated &&
                        myOrder.delivery_status === "delivered" && (
                          <div>
                            <ProductReview product={product} order={myOrder} />
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-5">
                    <div>
                      <p className="text-lg font-semibold text-green-600">
                        ${discountedPrice}
                      </p>

                      <p className="line-through text-sm text-gray-500">
                        ${price}
                      </p>
                      <p className="text-xs text-gray-500">
                        -{discountOrOffer}%
                      </p>
                    </div>
                    {/* return button for deliverd order */}
                    {myOrder.delivery_status === "delivered" &&
                      returnStatus === "" && (
                        <div
                          onClick={() => {
                            setReturnModalProductId(_id);
                            SetReturnModalClose(false);
                          }}
                          className="bg-red-600 cursor-pointer rounded-lg text-white px-2 py-1 hover:hover:bg-red-700 transition duration-200 ease-in-out"
                        >
                          Return
                        </div>
                      )}
                    {!returnModalClose && (
                      <div>
                        <ConfirmModal
                          message="Please confirm to Request for return this product"
                          setConfirmSubmit={setConfirmSubmit}
                          SetModalClose={SetReturnModalClose}
                          confimFunction={() =>
                            dispatch(
                              return_product({
                                orderId,
                                productId: returnModalProductId,
                              })
                            )
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        {myOrder.delivery_status !== "cancelled" &&
          myOrder.delivery_status !== "delivered" && (
            <div className="mt-8 flex gap-6 justify-end">
              {myOrder.payment_status !== "paid" && (
                <button
                  className="px-3 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-200 ease-in-out"
                  onClick={() => redirect(myOrder)}
                >
                  Make Payment
                </button>
              )}
              {
                <button
                  onClick={() => SetModalClose(false)}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-200 ease-in-out"
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

        {/* modal for return product */}
      </div>
    </div>
  );
};

export default OrderDetails;

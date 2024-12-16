import React from "react";
import {
  create_razorpay_payment_order,
  verify_razorpay_payment,
} from "../../store/reducers/orderReducer";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api/api";
import toast from "react-hot-toast";

const Razorpay = ({ orderId }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((store) => store.authUser);
  const { name, email, contact } = userInfo || {};
  const { isLoading } = useSelector((store) => store.order);

  const handlePayment = async () => {
    try {
      // Create order in backend
      //   await dispatch(create_razorpay_payment_order({ orderId }));

      const { data } = await api.post(
        `home/customer/online-payment/create-order/${orderId}`
      );
      const razorpayOrder = data.razorpayOrder;
      console.log(razorpayOrder);

      if (razorpayOrder) {
        // Validate razorpayOrder
        if (
          !razorpayOrder.id ||
          !razorpayOrder.amount ||
          !razorpayOrder.currency
        ) {
          throw new Error("Invalid Razorpay order data");
        }

        // Initialize Razorpay checkout
        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          name: "Easy Shop",
          description: "Test Transaction",
          order_id: razorpayOrder.id,
          handler: function (response) {
            const {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
            } = response;
            dispatch(
              verify_razorpay_payment({
                orderId,
                info: {
                  razorpay_payment_id,
                  razorpay_order_id,
                  razorpay_signature,
                },
              })
            );
          },
          prefill: {
            name: name || "User",
            email: email || "user@example.com",
            contact: contact || "9999999999",
          },
          theme: {
            color: "#5f967c",
          },
          modal: {
            ondismiss: function () {
              toast.error("Payment was cancelled!");
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      console.error("Error during payment process:", error);
      toast.error(
        "An error occurred while processing the payment. Please try again."
      );
    }
  };

  return (
    <div>
      <div className="w-full px-4 py-8 bg-white shadow-sm flex items-center">
        <h1 className="mx-4">Pay on Razorpay</h1>
        {isLoading ? (
          <div className="text-gray-500 animate-pulse">
            Processing your payment...
          </div>
        ) : (
          <button
            onClick={handlePayment}
            className="px-10 py-[6px] rounded-sm hover:shadow-green-500/20 hover:shadow-lg bg-[#059473] text-white"
          >
            Pay Now On Razorpay
          </button>
        )}
      </div>
    </div>
  );
};

export default Razorpay;

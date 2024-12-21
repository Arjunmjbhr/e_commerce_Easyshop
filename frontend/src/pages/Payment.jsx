import React, { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import Stripe from "./../componets/payment/Stripe";
import Header from "./../componets/Header";
import Footer from "./../componets/Footer";
import OrderSummaryPayment from "../componets/payment/OrderSummaryPayment";
import NavigationPayment from "../componets/payment/NavigationPayment";
import PayNow from "../componets/payment/PayNow";
import { cod_payment, messageClear } from "../store/reducers/orderReducer";
import ConfirmModal from "./../componets/ConfirmModal";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { get_order_details } from "../store/reducers/orderReducer";
import Razorpay from "../componets/payment/Razorpay";

const Payment = () => {
  const navigate = useNavigate();
  const {
    state: { price, items, orderId },
  } = useLocation();
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [modalClose, SetModalClose] = useState(true);
  const { errorMessage, successMessage, myOrder } = useSelector(
    (store) => store.order
  );
  let { couponAmount, payment_status } = myOrder;
  useEffect(() => {
    dispatch(get_order_details(orderId));
  }, [dispatch, orderId, successMessage]);
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      if (successMessage === "order placed successfuly") {
        navigate("/dashboard");
      }
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [errorMessage, successMessage, dispatch]);
  const handlePayment = () => {
    if (paymentMethod === "cod") {
      dispatch(cod_payment(orderId));
    }
  };
  return (
    <div>
      <Header />
      <section className="bg-[#eeeeee]">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16 mt-4 ">
          <div className="flex flex-wrap md:flex-col-reverse">
            <div className="w-7/12 md:mt-5 md:w-full">
              <div className="pr-2 md:pr-0">
                <NavigationPayment
                  setPaymentMethod={setPaymentMethod}
                  paymentMethod={paymentMethod}
                />
                {paymentMethod === "stripe" && <Stripe />}
                {payment_status !== "cod" &&
                  paymentMethod === "cod" &&
                  (price - couponAmount < 1000 ? (
                    "COD is not applicable below 1000 Rupees order"
                  ) : (
                    <PayNow SetModalClose={SetModalClose} />
                  ))}
                {paymentMethod === "razorpay" && (
                  <Razorpay orderId={orderId} price={price} />
                )}
              </div>
              <div>
                {!modalClose && (
                  <ConfirmModal
                    message="Please confim pay with cash on delivery"
                    SetModalClose={SetModalClose}
                    confimFunction={handlePayment}
                  />
                )}
              </div>
            </div>
            {/* summary */}
            <div className="w-5/12 md:w-full">
              <OrderSummaryPayment
                price={price}
                items={items}
                orderId={orderId}
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Payment;

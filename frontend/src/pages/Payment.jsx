import React, { useState } from "react";

import { useLocation } from "react-router-dom";
import Stripe from "./../componets/payment/Stripe";
import Header from "./../componets/Header";
import Footer from "./../componets/Footer";
import OrderSummaryPayment from "../componets/payment/OrderSummaryPayment";
import NavigationPayment from "../componets/payment/NavigationPayment";
import PayNow from "../componets/payment/PayNow";

const Payment = () => {
  const {
    state: { price, items, orderId },
  } = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  return (
    <div>
      <Header />
      <section className="bg-[#eeeeee]">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16 mt-4 ">
          <div className="flex flex-wrap md:flex-col-reverse">
            <div className="w-7/12 md:w-full">
              <div className="pr-2 md:pr-0">
                <NavigationPayment
                  setPaymentMethod={setPaymentMethod}
                  paymentMethod={paymentMethod}
                />
                {paymentMethod === "stripe" && <Stripe />}
                {paymentMethod === "cod" && <PayNow />}
              </div>
            </div>
            {/* summary */}
            <div className="w-5/12 md:w-full">
              <OrderSummaryPayment price={price} items={items} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Payment;

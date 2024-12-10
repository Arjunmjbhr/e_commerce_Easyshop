import React from "react";

const NavigationPayment = ({ setPaymentMethod, paymentMethod }) => {
  return (
    <div>
      <div className="flex flex-wrap">
        <div
          onClick={() => setPaymentMethod("stripe")}
          className={`w-[20%] border-r cursor-pointer py-8 px-12 ${
            paymentMethod === "stripe" ? "bg-white" : "bg-slate-100"
          } `}
        >
          <div className="flex flex-col gap-[3px] justify-center items-center">
            <img src="http://localhost:3000/images/payment/stripe.png" alt="" />
          </div>
          <span className="text-slate-600">Stripe</span>
        </div>

        <div
          onClick={() => setPaymentMethod("cod")}
          className={`w-[20%] border-r cursor-pointer py-8 px-12 ${
            paymentMethod === "cod" ? "bg-white" : "bg-slate-100"
          } `}
        >
          <div className="flex flex-col gap-[3px] justify-center items-center">
            <img src="http://localhost:3000/images/payment/cod.jpg" alt="" />
          </div>
          <span className="text-slate-600">COD</span>
        </div>
      </div>
    </div>
  );
};

export default NavigationPayment;

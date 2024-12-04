import React from "react";

const OrderSummaryShipping = ({ redirectToCheckout, res }) => {
  return (
    <div className="bg-white p-3 text-slate-600 flex flex-col gap-3">
      <h2 className="text-xl font-bold">Order Summary</h2>
      <div className="flex justify-between items-center">
        <span>2 Items </span>
        <span>₹343 </span>
      </div>
      <div className="flex justify-between items-center">
        <span>Shipping Fee </span>
        <span>₹40 </span>
      </div>
      <div className="flex justify-between items-center">
        <span>Total</span>
        <span className="text-lg text-[#059473]">₹430 </span>
      </div>
      <button
        onClick={redirectToCheckout}
        disabled={!res}
        className={`px-5 py-[6px] rounded-sm ${
          res
            ? `hover:shadow-orange-500/50 bg-red-500 hover:shadow-lg `
            : "bg-red-100"
        }  text-sm text-white uppercase`}
      >
        Place Order
      </button>
    </div>
  );
};

export default OrderSummaryShipping;

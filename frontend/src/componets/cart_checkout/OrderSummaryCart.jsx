import React from "react";

const OrderSummaryCart = ({ redirectToCheckout }) => {
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
      <div className="flex gap-2">
        <input
          className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-green-500 rounded-sm"
          type="text"
          placeholder="Input Vauchar Coupon"
        />
        <button className="px-5 py-[1px] bg-[#059473] text-white rounded-sm uppercase text-sm">
          Apply
        </button>
      </div>
      <div className="flex justify-between items-center">
        <span>Total</span>
        <span className="text-lg text-[#059473]">₹430 </span>
      </div>
      <button
        onClick={redirectToCheckout}
        className="px-5 py-[6px] rounded-sm hover:shadow-red-500/50 hover:shadow-lg bg-red-500 text-sm text-white uppercase "
      >
        Process to Checkout
      </button>
    </div>
  );
};

export default OrderSummaryCart;

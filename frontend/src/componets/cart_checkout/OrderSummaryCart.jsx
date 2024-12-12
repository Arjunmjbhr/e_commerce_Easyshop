import React from "react";

const OrderSummaryCart = ({
  redirectToCheckout,
  price,
  buy_product_item,
  shipping_fee,
}) => {
  return (
    <div className="bg-white p-3 text-slate-600 flex flex-col gap-3">
      <h2 className="text-xl font-bold">Order Summary</h2>
      <div className="flex justify-between items-center">
        <span>{buy_product_item} items </span>
        <span>₹{price} </span>
      </div>
      <div className="flex justify-between items-center">
        <span>Shipping Fee </span>
        <span>₹{shipping_fee}</span>
      </div>

      <div className="flex justify-between items-center">
        <span>Total</span>
        <span className="text-lg text-[#059473]">₹{shipping_fee + price} </span>
      </div>
      <button
        onClick={redirectToCheckout}
        className="px-5 py-[6px] rounded-sm hover:shadow-red-500/50 hover:shadow-lg bg-red-500 text-sm text-white uppercase "
      >
        Process to Checkout ({buy_product_item})
      </button>
    </div>
  );
};

export default OrderSummaryCart;

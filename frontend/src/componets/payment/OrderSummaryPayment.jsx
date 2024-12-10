import React from "react";

const OrderSummaryPayment = ({ price, items }) => {
  return (
    <div>
      <div className="pl-2 md:pl-0 md:mb-0">
        <div className="bg-white shadow p-5 text-slate-600 flex flex-col gap-3">
          <h2 className="font-bold text-lg">Order Summary </h2>
          <div className="flex justify-between items-center">
            <span>{items} Items and Shipping Fee Included </span>
            <span>₹{price} </span>
          </div>
          <div className="flex justify-between items-center font-semibold">
            <span>Total Amount </span>
            <span className="text-lg text-green-600">₹{price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryPayment;

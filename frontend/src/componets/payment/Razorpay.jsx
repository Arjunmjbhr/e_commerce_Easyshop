import React from "react";
import { create_razorpay_payment_order } from "../../store/reducers/orderReducer";
import { useDispatch } from "react-redux";

const Razorpay = ({ price, orderId }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="w-full px-4 py-8 bg-white shadow-sm flex items-center ">
        <h1 className=" mx-4">Pay on Razorpay</h1>
        <button
          onClick={() =>
            dispatch(create_razorpay_payment_order({ orderId, amount: price }))
          }
          className="px-10 py-[6px] rounded-sm hover:shadow-green-500/20 hover:shadow-lg bg-[#059473] text-white"
        >
          Pay Now On Razorpay
        </button>
      </div>
    </div>
  );
};

export default Razorpay;

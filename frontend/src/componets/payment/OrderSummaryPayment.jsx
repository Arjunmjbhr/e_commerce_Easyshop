import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  apply_coupon,
  remove_apply_coupon,
} from "../../store/reducers/orderReducer";
import { IoCloseCircleSharp } from "react-icons/io5";

const OrderSummaryPayment = ({ price, items, orderId }) => {
  const dispatch = useDispatch();
  const [couponApplied, setCouponApplied] = useState("");
  const { userInfo } = useSelector((store) => store.authUser);
  const { myOrder } = useSelector((store) => store.order);
  let { couponAmount } = myOrder;

  console.log(couponAmount);
  const handleApplyCoupon = () => {
    const data = {
      userId: userInfo.id,
      info: {
        couponId: couponApplied,
        orderId,
      },
    };
    dispatch(apply_coupon(data));
  };
  const handleDeleteCoupon = () => {
    const data = {
      userId: userInfo.id,
      info: {
        couponId: myOrder.couponId,
        orderId,
      },
    };
    dispatch(remove_apply_coupon(data));
  };

  return (
    <div>
      <div className="pl-2 md:pl-0 md:mb-0">
        <div className="bg-white shadow p-5 text-slate-600 flex flex-col gap-3">
          <h2 className="font-bold text-lg">Order Summary </h2>
          <div className="flex justify-between items-center">
            <span>{items} Items and Shipping Fee Included </span>
            <span>₹{price} </span>
          </div>
          {couponAmount ? (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span>Coupon Amount </span>
                <span onClick={handleDeleteCoupon} className="cursor-pointer">
                  <IoCloseCircleSharp />
                </span>
              </div>
              <span>-₹{couponAmount} </span>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                className="w-full px-3 py-2 border  border-slate-200 outline-0 focus:border-green-500 rounded-sm"
                type="text"
                value={couponApplied}
                onChange={(e) => setCouponApplied(e.target.value.toUpperCase())}
                placeholder="Input Vauchar Coupon"
              />
              <button
                onClick={handleApplyCoupon}
                className="px-5 py-[1px] bg-[#059473] text-white rounded-sm uppercase text-sm"
              >
                Apply
              </button>
            </div>
          )}
          <div className="flex justify-between items-center font-semibold">
            <span>Total Amount </span>
            <span className="text-lg text-green-600">
              ₹{couponAmount ? price - couponAmount : price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryPayment;

import React from "react";
import { useSelector } from "react-redux";

const SalesSummary = () => {
  const {
    totalOrder,
    totalProductSold,
    totalProductReturn,
    pendingOrder,
    totalSalesRevenue,
    totalAdminRevenue,
    couponUsedCount,
    couponUsedAmount,
  } = useSelector((store) => store.dashboard);
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white shadow rounded-md p-4">
          <h3 className="text-sm text-gray-500">total order</h3>
          <p className="text-xl font-bold text-gray-800">{totalOrder}</p>
        </div>
        <div className="bg-white shadow rounded-md p-4">
          <h3 className="text-sm text-gray-500">total product sold</h3>
          <p className="text-xl font-bold text-gray-800">{totalProductSold}</p>
        </div>
        <div className="bg-white shadow rounded-md p-4">
          <h3 className="text-sm text-gray-500">total product return</h3>
          <p className="text-xl font-bold text-gray-800">
            {totalProductReturn}
          </p>
        </div>
        <div className="bg-white shadow rounded-md p-4">
          <h3 className="text-sm text-gray-500">Pending Order</h3>
          <p className="text-xl font-bold text-gray-800">{pendingOrder}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white shadow rounded-md p-4">
          <h3 className="text-sm text-gray-500">Total sales Revenue</h3>
          <p className="text-xl font-bold text-gray-800">
            ₹{totalSalesRevenue}
          </p>
        </div>
        <div className="bg-white shadow rounded-md p-4">
          <h3 className="text-sm text-gray-500">Total Admin Revenue</h3>
          <p className="text-xl font-bold text-gray-800">
            ₹{totalAdminRevenue}
          </p>
        </div>
        <div className="bg-white shadow rounded-md p-4">
          <h3 className="text-sm text-gray-500">coupon used count</h3>
          <p className="text-xl font-bold text-gray-800">{couponUsedCount}</p>
        </div>
        <div className="bg-white shadow rounded-md p-4">
          <h3 className="text-sm text-gray-500">coupon used amount</h3>
          <p className="text-xl font-bold text-gray-800">₹{couponUsedAmount}</p>
        </div>
      </div>
    </div>
  );
};

export default SalesSummary;

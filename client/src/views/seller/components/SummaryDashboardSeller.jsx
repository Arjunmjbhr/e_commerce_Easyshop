import React from "react";
import { FaRupeeSign } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { MdOutlineSell } from "react-icons/md";
import { GiShoppingCart } from "react-icons/gi";
import { useSelector } from "react-redux";

const SummaryDashboardSeller = () => {
  const {
    sellerTotalOrder,
    sellerTotalProduct,
    sellerTotalSales,
    sellerPendingOrder,
  } = useSelector((store) => store.dashboard);
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-7 ">
        {/* Total sales */}
        <div className="w-[300px] xl:w-[200px] h-[70px] rounded-md bg-white flex justify-between  items-center px-3">
          <div>
            <div className="flex justify-start items-center gap-1">
              <FaRupeeSign />
              <h3 className="font-bold text-xl">{sellerTotalSales}</h3>
            </div>
            <h6>Total Sales</h6>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-700 flex justify-center items-center">
            <FaRupeeSign className="text-2xl" color="#fff" />
          </div>
        </div>
        {/* Total Products */}
        <div className="w-[300px] xl:w-[200px] h-[70px] rounded-md bg-white flex justify-between  items-center px-3">
          <div>
            <div className="flex justify-start items-center gap-1">
              <h3 className="font-bold text-xl">{sellerTotalProduct}</h3>
            </div>
            <h6>Products</h6>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-700 flex justify-center items-center">
            <MdOutlineProductionQuantityLimits
              className="text-2xl"
              color="#fff"
            />
          </div>
        </div>
        {/* Total sellers */}
        <div className="w-[300px] xl:w-[200px] h-[70px] rounded-md bg-white flex justify-between  items-center px-3">
          <div>
            <div className="flex justify-start items-center gap-1">
              <h3 className="font-bold text-xl">{sellerTotalOrder}</h3>
            </div>
            <h6>Total Orders</h6>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-700 flex justify-center items-center">
            <MdOutlineSell className="text-2xl" color="#fff" />
          </div>
        </div>
        {/* Orders */}
        <div className="w-[300px] xl:w-[200px]  h-[70px] rounded-md bg-white flex justify-between  items-center px-3">
          <div>
            <div className="flex justify-start items-center gap-1">
              <FaRupeeSign />
              <h3 className="font-bold text-xl">{sellerPendingOrder}</h3>
            </div>
            <h6>Pending Orders</h6>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-700 flex justify-center items-center">
            <GiShoppingCart className="text-2xl" color="#fff" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryDashboardSeller;

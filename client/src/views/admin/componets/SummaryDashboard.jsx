import React, { useEffect } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { MdOutlineSell } from "react-icons/md";
import { GiShoppingCart } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";
import { get_admin_dashboard_data } from "../../../store/Reducers/dashboardReducer";

const SummaryDashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_admin_dashboard_data());
  }, [dispatch]);
  const {
    allSalesRevenue = 0,
    allOrders = 0,
    allProducts = 0,
    allSellers = 0,
  } = useSelector((store) => store.dashboard);
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-7 ">
        {/* Total sales */}
        <div className="w-[300px] xl:w-[200px] h-[70px] rounded-md bg-white flex justify-between  items-center px-3">
          <div>
            <div className="flex justify-start items-center gap-1">
              <FaRupeeSign />
              <h3 className="font-bold text-xl">{allSalesRevenue}</h3>
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
              <h3 className="font-bold text-xl">{allProducts}</h3>
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
              <h3 className="font-bold text-xl">{allSellers}</h3>
            </div>
            <h6>Sellers</h6>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-700 flex justify-center items-center">
            <MdOutlineSell className="text-2xl" color="#fff" />
          </div>
        </div>
        {/* Orders */}
        <div className="w-[300px] xl:w-[200px]  h-[70px] rounded-md bg-white flex justify-between  items-center px-3">
          <div>
            <div className="flex justify-start items-center gap-1">
              <h3 className="font-bold text-xl">{allOrders}</h3>
            </div>
            <h6>Orders</h6>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-700 flex justify-center items-center">
            <GiShoppingCart className="text-2xl" color="#fff" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryDashboard;

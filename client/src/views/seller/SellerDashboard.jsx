import React, { useEffect } from "react";
import SummaryDashboard from "./components/SummaryDashboardSeller";
import ChartDashboard from "../admin/componets/ChartDashboard";
import { get_seller_dashboard_data } from "../../store/Reducers/dashboardReducer";

import { useDispatch, useSelector } from "react-redux";

const SellerDashboard = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((store) => store.auth);

  useEffect(() => {
    dispatch(get_seller_dashboard_data({ sellerId: userInfo._id }));
  }, [dispatch]);
  return (
    <div className="flex flex-col justify-center">
      <div className="px-2 sm:px-7">
        {/* total summary */}
        <SummaryDashboard />
      </div>
      <div>
        <ChartDashboard />
      </div>
    </div>
  );
};

export default SellerDashboard;

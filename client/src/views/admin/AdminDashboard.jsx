import React, { useEffect } from "react";
import SummaryDashboard from "./componets/SummaryDashboard";
import ChartDashboard from "./componets/ChartDashboard";
import { get_admin_dashboard_data } from "../../store/Reducers/dashboardReducer";
import { useDispatch } from "react-redux";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_admin_dashboard_data());
  }, []);
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

export default AdminDashboard;

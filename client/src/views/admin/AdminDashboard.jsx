import React from "react";
import SummaryDashboard from "./componets/SummaryDashboard";
import ChartDashboard from "./componets/ChartDashboard";

const AdminDashboard = () => {
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

import React, { useState } from "react";
import CustomerOrders from "./CustomerOrders";

const OrderDashboard = () => {
  const [state, setState] = useState("all");
  return (
    <div>
      <div className="bg-white flex items-center justify-between py-3 px-10 rounded-xl my-4 ">
        <h1 className="text-xl font-bold mb-4 ">My Orders</h1>
        <select
          className="outline-none px-3 py-1 border rounded-md text-slate-600"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="all">--order status--</option>
          <option value="placed">Placed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
          <option value="warehouse">Warehouse</option>
        </select>
      </div>
      <div className="bg-white p-4 rounded-xl">
        <CustomerOrders />
      </div>
    </div>
  );
};

export default OrderDashboard;

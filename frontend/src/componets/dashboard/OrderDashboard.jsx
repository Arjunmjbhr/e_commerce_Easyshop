import React, { useState, useEffect } from "react";
import CustomerOrders from "./CustomerOrders";
import { useDispatch, useSelector } from "react-redux";
import { get_orders } from "../../store/reducers/orderReducer";

const OrderDashboard = () => {
  const [state, setState] = useState("all");
  const dispatch = useDispatch();
  const { userInfo } = useSelector((store) => store.authUser);
  const { myOrders } = useSelector((store) => store.order);
  useEffect(() => {
    dispatch(get_orders({ customerId: userInfo.id, status: state }));
  }, [state]);
  return (
    <div>
      <div className="bg-blue-600 shadow-lg flex items-center justify-between px-10 rounded-xl my-4 ">
        <h1 className="text-2xl text-white text-center py-4   font-bold  ">
          My Orders
        </h1>
        <select
          className="outline-none px-3 py-1 border rounded-md text-slate-600"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="all">--order status--</option>
          <option value="pending">Pending</option>
          <option value="placed">Placed</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-xl">
        <CustomerOrders recentOrders={myOrders} />
      </div>
    </div>
  );
};

export default OrderDashboard;

import React, { useEffect } from "react";
import { RiShoppingCart2Fill } from "react-icons/ri";
import CustomerOrders from "./CustomerOrders";
import { useDispatch, useSelector } from "react-redux";
import { get_dashboard_index_data } from "../../store/reducers/dashboardReducer";

const Index = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((store) => store.authUser);
  const { recentOrders, totalOrder, pendingOrder, cancelledOrder } =
    useSelector((store) => store.dashboard);

  useEffect(() => {
    dispatch(get_dashboard_index_data(userInfo.id));
  }, []);
  return (
    <div>
      {/* summary */}
      <div className="grid grid-cols-3 md:grid-cols-1 gap-5 mb-5">
        <div className="flex justify-center items-center p-5 shadow-md  bg-gradient-to-r from-blue-500 to-fuchsia-500 rounded-md gap-5">
          <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <span className="text-xl text-green-800">
              <RiShoppingCart2Fill />
            </span>
          </div>
          <div className="flex flex-col justify-start items-start text-white">
            <h2 className="text-3xl font-bold">{totalOrder}</h2>
            <span>Orders </span>
          </div>
        </div>
        <div className="flex justify-center items-center p-5 shadow-md  bg-gradient-to-r from-blue-500 to-fuchsia-500  rounded-md gap-5">
          <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <span className="text-xl text-green-800">
              <RiShoppingCart2Fill />
            </span>
          </div>
          <div className="flex flex-col justify-start items-start text-white">
            <h2 className="text-3xl font-bold">{pendingOrder}</h2>
            <span>Pending Orders </span>
          </div>
        </div>
        <div className="flex justify-center items-center p-5 shadow-md  bg-gradient-to-r from-blue-500 to-fuchsia-500  rounded-md gap-5">
          <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <span className="text-xl text-green-800">
              <RiShoppingCart2Fill />
            </span>
          </div>
          <div className="flex flex-col justify-start items-start text-white">
            <h2 className="text-3xl font-bold">{cancelledOrder}</h2>
            <span>Cancelled Orders </span>
          </div>
        </div>
      </div>
      {/* order */}
      <div className="bg-white p-5 shadow-md  rounded-md">
        <h2 className="text-xl font-bold text-center mb-4 ">Recent Orders</h2>
        <CustomerOrders recentOrders={recentOrders} />
      </div>
    </div>
  );
};
export default Index;

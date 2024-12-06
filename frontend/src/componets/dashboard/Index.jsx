import React from "react";
import { RiShoppingCart2Fill } from "react-icons/ri";
import CustomerOrders from "./CustomerOrders";
const Index = () => {
  return (
    <div>
      {/* summary */}
      <div className="grid grid-cols-3 md:grid-cols-1 gap-5 mb-5">
        <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
          <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <span className="text-xl text-green-800">
              <RiShoppingCart2Fill />
            </span>
          </div>
          <div className="flex flex-col justify-start items-start text-slate-600">
            <h2 className="text-3xl font-bold">45</h2>
            <span>Orders </span>
          </div>
        </div>
        <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
          <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <span className="text-xl text-green-800">
              <RiShoppingCart2Fill />
            </span>
          </div>
          <div className="flex flex-col justify-start items-start text-slate-600">
            <h2 className="text-3xl font-bold">25</h2>
            <span>Pending Orders </span>
          </div>
        </div>
        <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
          <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <span className="text-xl text-green-800">
              <RiShoppingCart2Fill />
            </span>
          </div>
          <div className="flex flex-col justify-start items-start text-slate-600">
            <h2 className="text-3xl font-bold">2</h2>
            <span>Cancelled Orders </span>
          </div>
        </div>
      </div>
      {/* order */}
      <div className="bg-white p-5  rounded-md">
        <h2 className="text-xl font-bold text-center mb-4 ">Recent Orders</h2>
        <CustomerOrders />
      </div>
    </div>
  );
};
export default Index;

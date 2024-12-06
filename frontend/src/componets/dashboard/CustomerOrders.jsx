import React from "react";
import { MdEdit } from "react-icons/md";
const CustomerOrders = () => {
  return (
    <div className="pt-4">
      <div className="relative overflow-x-auto rounded-md">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order Id
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                payment status
              </th>
              <th scope="col" className="px-6 py-3">
                Order Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-xs text-gray-700 uppercase bg-white">
            <tr className="border-b-2">
              <td className="px-6 py-4 font-medium whitespace-nowrap">
                order id
              </td>
              <td className="px-6 py-4 font-medium whitespace-nowrap">price</td>
              <td className="px-6 py-4 font-medium whitespace-nowrap">
                payment status
              </td>
              <td className="px-6 py-4 font-medium whitespace-nowrap">
                order status
              </td>
              <td className="px-6 py-4 text-xl whitespace-nowrap ">
                <MdEdit />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerOrders;

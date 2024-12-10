import React from "react";
import { MdEdit } from "react-icons/md";
import { FaCcAmazonPay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const CustomerOrders = ({ recentOrders }) => {
  const navigate = useNavigate();
  // redirect to payment page
  const redirect = (order) => {
    let items = 0;
    for (let i = 0; i < order.products.length; i++) {
      items += order.products[i].quantity;
    }
    navigate("/payment", {
      state: {
        price: order.price,
        items,
        orderId: order._id,
      },
    });
  };

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
                Date
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
            {recentOrders.map((order) => (
              <tr key={order._id} className="border-b-2">
                <td className="px-6 py-4 font-medium whitespace-nowrap">
                  {order._id}
                </td>
                <td className="px-6 py-4 font-medium whitespace-nowrap">
                  {order.price}
                </td>
                <td className="px-6 py-4 font-medium whitespace-nowrap">
                  {order.date}
                </td>
                <td className="px-6 py-4 font-medium whitespace-nowrap">
                  {order.payment_status}
                </td>
                <td className="px-6 py-4 font-medium whitespace-nowrap">
                  {order.delivery_status}
                </td>
                <td className="px-6 py-4 text-xl whitespace-nowrap ">
                  <div className="flex gap-4">
                    <Link to={`/dashboard/order/details/${order._id}`}>
                      <span className="cursor-pointer">
                        <MdEdit />
                      </span>
                    </Link>
                    {order.payment_status !== "paid" &&
                      order.delivery_status !== "cancelled" &&
                      order.delivery_status !== "delivered" && (
                        <span
                          onClick={() => redirect(order)}
                          className="cursor-pointer"
                        >
                          <FaCcAmazonPay />
                        </span>
                      )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerOrders;

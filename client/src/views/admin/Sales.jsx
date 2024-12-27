import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Pagination from "./../Pagination";
import { useDispatch, useSelector } from "react-redux";
import { get_admin_sales_data } from "../../store/Reducers/dashboardReducer";
import toast from "react-hot-toast";
import { downloadPDF } from "../../utils/downloadPdfAdmin";
import SalesSummary from "./componets/SalesSummary";
import { downloadEXCEL } from "../../utils/downloadExcelAdmin";

const Sales = () => {
  const today = new Date();
  const [filter, setFilter] = useState("Day");
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const {
    salesOrders,
    totalOrder,
    totalProductSold,
    totalProductReturn,
    pendingOrder,
    totalSalesRevenue,
    totalAdminRevenue,
    couponUsedCount,
    couponUsedAmount,
  } = useSelector((store) => store.dashboard);

  //  download pdf functions
  const downloadPdf = (salesOrders) => {
    downloadPDF(
      salesOrders,
      totalOrder,
      totalProductSold,
      totalProductReturn,
      pendingOrder,
      totalSalesRevenue,
      totalAdminRevenue,
      couponUsedCount,
      couponUsedAmount
    );
  };
  const downloadExcel = (salesOrders) => {
    downloadEXCEL(
      salesOrders,
      totalOrder,
      totalProductSold,
      totalProductReturn,
      pendingOrder,
      totalSalesRevenue,
      totalAdminRevenue,
      couponUsedCount,
      couponUsedAmount
    );
  };

  useEffect(() => {
    let beginDate;
    let lastDate;
    switch (filter) {
      case "Day": {
        const today = new Date();
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = today;
        beginDate = start;
        lastDate = end;
        break;
      }
      case "Week": {
        const today = new Date();
        const start = new Date(today);
        start.setDate(today.getDate() - 6);
        start.setHours(0, 0, 0, 0);
        const end = new Date();
        beginDate = start;
        lastDate = end;
        break;
      }
      case "Month": {
        const today = new Date();
        const start = new Date(today.getFullYear(), today.getMonth(), 1);
        const end = today;
        beginDate = start;
        lastDate = end;
        break;
      }
      case "Last Month": {
        const today = new Date();
        const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const end = new Date(
          today.getFullYear(),
          today.getMonth(),
          0,
          23,
          59,
          59,
          999
        );
        beginDate = start;
        lastDate = end;
        break;
      }
      case "Current Year": {
        const today = new Date();
        const start = new Date(today.getFullYear(), 0, 1);
        const end = today;
        beginDate = start;
        lastDate = end;
        break;
      }
      case "Custom Range": {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        beginDate = start;
        lastDate = end;
        break;
      }
      default: {
        console.warn("Unknown filter:", filter);
        break;
      }
    }
    const data = {
      page: currentPage,
      beginDate,
      lastDate,
    };
    if (beginDate > lastDate) {
      toast.error("end date should be after begin date");
    }
    dispatch(get_admin_sales_data(data));
  }, [filter, startDate, endDate]);

  return (
    <div className="p-6  min-h-screen mr-8 ml-2 ">
      {/* Summary Section */}
      <div>
        <SalesSummary />
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-between flex-wrap">
        <div className="flex flex-wrap gap-4 mb-6">
          {[
            "Day",
            "Week",
            "Month",
            "Last Month",
            "Current Year",
            "Custom Range",
          ].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-4 py-2 rounded-md text-sm ${
                filter === item
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              } hover:bg-blue-600 hover:text-white`}
            >
              {item}
            </button>
          ))}
        </div>
        {/* Download Buttons at the Top */}
        <div className="flex justify-end gap-4 mb-6">
          <button
            onClick={() => downloadPdf(salesOrders)}
            className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
          >
            Download PDF
          </button>
          <button
            onClick={() => downloadExcel(salesOrders)}
            className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600"
          >
            Download Excel
          </button>
        </div>
      </div>

      {/* Custom Range calender */}
      {filter === "Custom Range" && (
        <div className="flex items-center gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Start Date
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="p-2 border rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              End Date
            </label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="p-2 border rounded-md w-full"
            />
          </div>
        </div>
      )}

      {/* sales order Data Table */}
      <div className="bg-white shadow rounded-md p-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Sales Orders
        </h2>
        {salesOrders.length > 0 ? (
          <table className="w-full table-auto">
            <thead>
              <tr className="text-sm text-center text-white bg-blue-600">
                <th className="border px-4 py-2 ">Order ID</th>
                <th className="border px-4 py-2 ">Order Date</th>
                <th className="border px-4 py-2 ">
                  Amount <br />
                  (MRP)
                </th>
                <th className="border px-4 py-2 ">
                  Discount <br />
                  (%)
                </th>
                <th className="border px-4 py-2">
                  Coupon <br /> Amount
                </th>
                <th className="border px-4 py-2">
                  Delivery <br />
                  Charge
                </th>
                <th className="border px-4 py-2 ">Net Amount</th>
              </tr>
            </thead>
            <tbody>
              {salesOrders.map((sale) => {
                const { _id, price, createdAt, couponAmount, shippingFee } =
                  sale;
                // actul price of the product
                const ActualPrice = sale?.products?.reduce(
                  (amount, product) => {
                    if (product.returnStatus !== "accepted") {
                      const { price, quantity } = product;
                      const totalPrice = price * quantity;
                      return amount + totalPrice;
                    }
                    return amount;
                  },
                  0
                );

                // product sold price using discount and offerdiscount actual price

                const productsSoldPrice = sale?.products?.reduce(
                  (amount, product) => {
                    const { validOfferPercentage, discount, price, quantity } =
                      product;

                    if (product.returnStatus !== "accepted") {
                      const validOffreDiscount =
                        validOfferPercentage > discount
                          ? validOfferPercentage
                          : discount;
                      const totalPrice =
                        (price - (price * validOffreDiscount) / 100) * quantity;

                      return amount + totalPrice;
                    }
                    return amount;
                  },
                  0
                );
                // discount total
                const orderDiscount =
                  100 - (productsSoldPrice / ActualPrice) * 100;

                return (
                  <tr key={_id} className="text-sm text-center">
                    <td className="border text-slate-600 px-4 uppercase py-2">
                      {_id}
                    </td>
                    <td className="border px-4 py-2 flex  flex-col">
                      <span>
                        {" "}
                        {new Date(createdAt).toLocaleDateString("en-GB", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span className="text-slate-500">
                        {new Date(createdAt).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </span>
                    </td>
                    <td className="border px-4 py-2">
                      {ActualPrice ? `₹${ActualPrice}` : "Return"}
                    </td>
                    <td className="border px-4 py-2">
                      {orderDiscount ? `${orderDiscount.toFixed(2)}%` : "Nil"}
                    </td>
                    <td className="border px-4 py-2">
                      {couponAmount ? `₹ ${couponAmount}` : "Nil"}
                    </td>
                    <td className="border px-4 py-2">₹{shippingFee}</td>
                    <td className="border text-md text-green-700 font-bold px-4 py-2">
                      ₹{price}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">
            No sales data available for this range.
          </p>
        )}
      </div>
      <div className="w-full flex justify-end mt-4 bottom-4 right-4">
        <Pagination
          pageNumber={currentPage}
          setPageNumber={setCurrentPage}
          totalItem={totalOrder}
          perPage={10}
          showItem={3}
        />
      </div>
    </div>
  );
};

export default Sales;

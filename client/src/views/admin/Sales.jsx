import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { saveAs } from "file-saver";
import Pagination from "./../Pagination";
import { useDispatch } from "react-redux";
import { get_admin_sales_data } from "../../store/Reducers/dashboardReducer";
import toast from "react-hot-toast";

const SalesReport = () => {
  const today = new Date();
  const [filter, setFilter] = useState("Day");
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  // Mock download functions
  const downloadPDF = () => {
    const blob = new Blob(["Sales Report PDF"], { type: "application/pdf" });
    saveAs(blob, "sales_report.pdf");
  };

  const downloadExcel = () => {
    const blob = new Blob(["Sales Report Excel"], {
      type: "application/vnd.ms-excel",
    });
    saveAs(blob, "sales_report.xls");
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
        const start = startDate;
        start.setHours(0, 0, 0, 0);
        beginDate = start;
        lastDate = endDate;
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
    <div className="p-6 bg-slate-100 min-h-screen mr-8 ml-2 ">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Sales Report</h1>

      {/* Download Buttons at the Top */}
      <div className="flex justify-end gap-4 mb-6">
        <button
          onClick={downloadPDF}
          className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
        >
          Download PDF
        </button>
        <button
          onClick={downloadExcel}
          className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600"
        >
          Download Excel
        </button>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white shadow rounded-md p-4">
          <h3 className="text-sm text-gray-500">totalProductSale</h3>
          <p className="text-xl font-bold text-gray-800">333</p>
        </div>
        <div className="bg-white shadow rounded-md p-4">
          <h3 className="text-sm text-gray-500">totalOrder</h3>
          <p className="text-xl font-bold text-gray-800">333</p>
        </div>
        <div className="bg-white shadow rounded-md p-4">
          <h3 className="text-sm text-gray-500">totalRevenueToSellers</h3>
          <p className="text-xl font-bold text-gray-800">33</p>
        </div>
        <div className="bg-white shadow rounded-md p-4">
          <h3 className="text-sm text-gray-500">totalRevenueToAdmin</h3>
          <p className="text-xl font-bold text-gray-800">44</p>
        </div>
      </div>

      {/* Filter Buttons */}
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

      {/* Custom Range */}
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

      {/* Filtered Data Table */}
      <div className="bg-white shadow rounded-md p-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Sales Orders
        </h2>
        {[1, 2, 3, 4].length > 0 ? (
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-left">Order ID</th>
                <th className="border px-4 py-2 text-left">Amount</th>
                <th className="border px-4 py-2 text-left">Date</th>
                <th className="border px-4 py-2 text-left">Discount</th>
                <th className="border px-4 py-2 text-left">Net Amount</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4].map((sale) => (
                <tr key={sale.id}>
                  <td className="border px-4 py-2">{1}</td>
                  <td className="border px-4 py-2">{2}</td>
                  <td className="border px-4 py-2">{3}</td>
                  <td className="border px-4 py-2">${4}</td>
                  <td className="border px-4 py-2">${5}</td>
                </tr>
              ))}
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
          totalItem={40}
          perPage={5}
          showItem={3}
        />
      </div>
    </div>
  );
};

export default SalesReport;

import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useSelector, useDispatch } from "react-redux";
import { get_admin_dashboard_chart } from "./../../../store/Reducers/dashboardReducer";

const ChartDashboard = () => {
  const dispatch = useDispatch();
  const [chartFilter, setChartFilter] = useState("month");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data when the component mounts
  useEffect(() => {
    setIsLoading(true);
    dispatch(get_admin_dashboard_chart({ info: chartFilter })).finally(() =>
      setIsLoading(false)
    );
  }, [chartFilter, dispatch]);

  const { chartRevenue = [], chartOrders = [] } = useSelector(
    (store) => store.dashboard
  );

  // Debugging logs
  useEffect(() => {
    console.log("Filter changed:", chartFilter);
    console.log("Updated chartRevenue:", chartRevenue);
    console.log("Updated chartOrders:", chartOrders);
  }, [chartFilter, chartRevenue, chartOrders]);

  // Transform revenue and orders data
  const chartRevenueInThousands = Array.isArray(chartRevenue)
    ? chartRevenue.map((revenue) =>
        typeof revenue === "number" ? revenue / 1000 : 0
      )
    : Array(12).fill(0);

  const ordersData = Array.isArray(chartOrders)
    ? chartOrders
    : Array(12).fill(0);

  // ApexCharts config
  const state = {
    series: [
      {
        name: "Orders",
        data: ordersData.length > 0 ? ordersData : [],
      },
      {
        name: "Revenue",
        data: chartRevenueInThousands.length > 0 ? chartRevenueInThousands : [],
      },
    ],
    options: {
      colors: ["#181ee8", "#00d084"],
      chart: {
        type: "bar",
        background: "transparent",
        foreColor: "#d0d2d6",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        curve: "smooth",
        width: 1,
      },
      xaxis: {
        categories:
          chartFilter === "month"
            ? [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ]
            : [2024, 2023, 2022, 2021, 2020],
      },
      legend: {
        position: "top",
      },
    },
  };

  const handleFilterChange = (e) => {
    setChartFilter(e.target.value);
  };

  return (
    <div className="mb-10">
      <div className="flex justify-center flex-wrap mt-7">
        <div className="lg:w-11/12 lg:pr-3">
          <div className="w-full bg-[#6a5fdf] p-4 rounded-md">
            <div>
              <h1 className="text-center text-2xl font-bold mb-4 text-white">
                Sales Chart
              </h1>
              <div className="text-end text-sm">
                <label htmlFor="chartFilter" className="sr-only">
                  Filter by
                </label>
                <select
                  id="chartFilter"
                  onChange={handleFilterChange}
                  value={chartFilter}
                  className="rounded-md"
                >
                  <option value="month">Monthly</option>
                  <option value="year">Yearly</option>
                </select>
              </div>
            </div>
            <div>
              {isLoading ? (
                <div className="text-center text-white">Loading data...</div>
              ) : (
                <Chart
                  options={state.options || {}}
                  series={state.series || {}}
                  type="bar"
                  height={350}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartDashboard;

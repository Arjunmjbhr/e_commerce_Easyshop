import React from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

const ChartDashboard = () => {
  const { chartRevenue, chartOrders } = useSelector((store) => store.dashboard);
  const chartRevenueInThousands = chartRevenue.map((revenue) => revenue / 1000);
  const state = {
    series: [
      {
        name: "Orders",
        data: chartOrders,
      },
      {
        name: "Revenue",
        data: chartRevenueInThousands,
      },
    ],
    options: {
      colors: ["#181ee8", "#00d084"], // Updated colors for distinction
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
        categories: [
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
        ],
      },
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="mb-10">
      <div className="flex justify-center flex-wrap mt-7">
        <div className="lg:w-11/12 lg:pr-3">
          <div className="w-full bg-[#6a5fdf] p-4 rounded-md">
            <Chart
              options={state.options}
              series={state.series || []}
              type="bar"
              height={350}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartDashboard;

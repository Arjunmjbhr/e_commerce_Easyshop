import React, { useEffect } from "react";
import { get_top_data } from "../../store/Reducers/dashboardReducer";
import { useDispatch, useSelector } from "react-redux";

const Best = () => {
  const dispatch = useDispatch();
  const { seller } = useSelector((store) => store.dashboard);
  useEffect(() => {
    dispatch(get_top_data());
  }, []);
  return (
    <div className="p-6  rounded-lg ">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Best Highlights
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Best Seller */}
        <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700">Best Seller</h2>
          <p className="text-gray-600 mt-2">
            {seller} <span className="text-green-500"></span>
          </p>
        </div>

        {/* Best Selling Product */}
        <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700">
            Best Selling Product
          </h2>
          <p className="text-gray-600 mt-2">
            XYZ Phone Pro <span className="text-blue-500">(1,000 units)</span>
          </p>
        </div>

        {/* Best Category */}
        <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700">Best Category</h2>
          <p className="text-gray-600 mt-2">
            Electronics <span className="text-purple-500">(5,000 items)</span>
          </p>
        </div>

        {/* Best Brand */}
        <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700">Best Brand</h2>
          <p className="text-gray-600 mt-2">
            TechCorp <span className="text-yellow-500">(15 awards)</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Best;

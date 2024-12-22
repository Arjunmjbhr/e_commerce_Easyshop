import React, { useEffect } from "react";
import { get_top_data } from "../../store/Reducers/dashboardReducer";
import { useDispatch, useSelector } from "react-redux";

const Best = () => {
  const dispatch = useDispatch();
  const { seller, topProduct, topCategory, topBrand } = useSelector(
    (store) => store.dashboard
  );
  useEffect(() => {
    dispatch(get_top_data());
  }, []);
  return (
    <div className="p-6  rounded-lg ">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Best Highlights
      </h1>
      <div className="grid grid-cols-1  gap-6">
        {/* Best Selling Product */}
        <div className="p-4 bg-zinc-400 rounded-lg shadow hover:shadow-lg border">
          <h2 className="text-xl font-semibold text-center text-gray-700">
            Best Selling Product
          </h2>
          {topProduct &&
            topProduct.map((product, index) => (
              <p className="text-gray-600 bg-white mt-2 px-2 py-1 rounded-md flex  gap-3">
                <span>{index + 1}</span>
                <span>{product.name}</span>
                <span className="text-blue-500">
                  ({product.totalQuantity} items)
                </span>
              </p>
            ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Best Category */}
          <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg">
            <h2 className="text-xl font-semibold text-center text-gray-700">
              Best Category
            </h2>
            {topCategory &&
              topCategory.map((category, index) => (
                <p className="text-gray-600 mt-2 flex gap-3">
                  <span>{index + 1}</span>
                  <span>{category._id}</span>
                  <span className="text-purple-500">
                    ({category.totalQuantity} items)
                  </span>
                </p>
              ))}
          </div>

          {/* Best Brand */}
          <div className="p-4  bg-white rounded-lg shadow hover:shadow-lg">
            <h2 className="text-xl text-center font-semibold text-gray-700">
              Best Brand
            </h2>
            {topBrand &&
              topBrand.map((category, index) => (
                <p className="text-gray-600 mt-2 flex gap-3">
                  <span>{index + 1}</span>
                  <span>{category._id}</span>
                  <span className="text-purple-500">
                    ({category.totalQuantity} items)
                  </span>
                </p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Best;

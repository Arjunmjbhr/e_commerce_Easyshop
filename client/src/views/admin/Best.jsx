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
      <div className="grid grid-cols-1  gap-6">
        {/* Best Selling Product */}
        <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg border">
          <h2 className="text-xl font-bold mb-6 text-center text-gray-700">
            Best Selling Product
          </h2>
          {topProduct &&
            topProduct.map((product, index) => (
              <p className="shadow-lg rounded-lg mt-2 group font-semibold hover:bg-blue-600 hover:text-white p-3 flex gap-3">
                <span>{index + 1}</span>
                <span>{product.name}</span>
                <span className="text-blue-600 font-semibold group-hover:text-white">
                  ({product.totalQuantity} items)
                </span>
              </p>
            ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Best Category */}
          <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center text-gray-700">
              Best Category
            </h2>
            {topCategory &&
              topCategory.map((category, index) => (
                <p className="shadow-lg mt-2 group rounded-lg font-semibold hover:bg-blue-600 hover:text-white p-3 flex gap-3">
                  <span>{index + 1}</span>
                  <span>{category._id}</span>
                  <span className="text-blue-600 font-semibold group-hover:text-white">
                    ({category.totalQuantity} items)
                  </span>
                </p>
              ))}
          </div>

          {/* Best Brand */}
          <div className="p-4  bg-white rounded-lg shadow hover:shadow-lg">
            <h2 className="text-xl text-center font-bold mb-4 text-gray-700">
              Best Brand
            </h2>
            {topBrand &&
              topBrand.map((category, index) => (
                <p className="shadow-lg mt-2 rounded-lg group font-semibold hover:bg-blue-600 hover:text-white p-3 flex gap-3">
                  <span>{index + 1}</span>
                  <span>{category._id}</span>
                  <span className="text-blue-600 font-semibold group-hover:text-white">
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

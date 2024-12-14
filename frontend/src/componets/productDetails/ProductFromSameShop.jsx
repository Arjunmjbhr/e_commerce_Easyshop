import React from "react";
import { Link } from "react-router-dom";
import Ratings from "../Ratings";

const ProductFromSameShop = ({ moreProducts, product }) => {
  return (
    <div>
      <div className="w-full">
        <div className="pl-4 md-lg:pl-0">
          <div className="bg-slate-500 py-2 text-white pl-4">
            <h2>From {product.shopName}</h2>
          </div>
          <div className="flex flex-col gap-5 mt-3 border p-3">
            {moreProducts.map((pro) => {
              return (
                <div key={pro._id} className="p-2 shadow-xl">
                  <Link to={`/product/details/${pro.slug}`} className="block">
                    <div className="relative h-[200px] ">
                      <img
                        className="w-full h-full"
                        src={`${pro.images[0]}`}
                        alt=""
                      />
                      {pro.discount !== 0 && (
                        <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                          {pro.discount}%
                        </div>
                      )}
                    </div>

                    <h2 className="text-slate-600 py-1 font-semibold text-sm">
                      {pro.name}
                    </h2>
                    <div className="flex gap-4">
                      <h2 className="text-md font-bold text-slate-600">
                        ₹
                        {pro.discount
                          ? pro.price -
                            Math.floor((pro.price * pro.discount) / 100)
                          : pro.price}
                      </h2>
                      <div className="flex items-center gap-1">
                        <Ratings ratings={pro.rating} />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFromSameShop;

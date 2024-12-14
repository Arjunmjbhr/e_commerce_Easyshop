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
              const {
                _id,
                discount,
                images,
                name,
                slug,

                rating,
                price,
                validOfferPercentage,
              } = pro;
              let discountOrOffer =
                discount > validOfferPercentage
                  ? discount
                  : validOfferPercentage;
              let flagOfOffer = discount > validOfferPercentage ? false : true;
              return (
                <div key={_id} className="p-2 shadow-xl">
                  <Link to={`/product/details/${slug}`} className="block">
                    <div className="relative h-[200px] ">
                      <img
                        className="w-full h-full"
                        src={`${images[0]}`}
                        alt={name}
                      />
                      {discountOrOffer !== 0 && (
                        <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                          {discountOrOffer}%
                        </div>
                      )}
                      {flagOfOffer && (
                        <div className=" text-[10px] text-black py-1 absolute bg-yellow-400  flex justify-center items-center rounded-md shadow-md top-2 right-2 px-2">
                          Category Offer
                        </div>
                      )}
                    </div>

                    <h2 className="text-slate-600 py-1 font-semibold text-sm">
                      {name}
                    </h2>
                    <div className="flex gap-4">
                      <h2 className="text-md font-bold text-slate-600">
                        ₹
                        {discountOrOffer
                          ? price - Math.floor((price * discountOrOffer) / 100)
                          : price}
                      </h2>
                      <div className="flex items-center gap-1">
                        <Ratings ratings={rating} />
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

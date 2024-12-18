import React from "react";
const ShippingProduct = ({ shop, isShipping }) => {
  return (
    <div>
      <div>
        {shop.products.map((product) => {
          let { validOfferPercentage } = product;
          const { images, name, brand, price, discount } = product?.productInfo;
          let discountOrOffer =
            discount > validOfferPercentage ? discount : validOfferPercentage;
          console.log("product in the shippig", product);

          return (
            <div className="w-full flex flex-wrap bg-white ">
              <div className="flex sm:w-full gap-2 w-6/12">
                <div className="flex justify-start items-center ">
                  <img
                    className="w-[100px] h-[100px] p-2"
                    src={images[0]}
                    alt="product images"
                  />
                </div>
                <div className="pr-4 text-slate-600">
                  <h2 className="text-sm font-semibold">{name}</h2>
                  <span className="text-sm">Brand: {brand}</span>
                </div>
              </div>
              <div className="flex justify-between w-5/12 sm:w-full sm:mt-3">
                <div className="pl-4 sm:pl-0 text-md">
                  <h2 className=" text-orange-500">
                    ₹
                    {discountOrOffer &&
                      price - Math.floor((price * discountOrOffer) / 100)}
                  </h2>
                  <p className="line-through">₹{price}</p>
                  <p> -{discountOrOffer}%</p>
                </div>
                <div></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShippingProduct;

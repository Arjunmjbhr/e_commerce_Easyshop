import React from "react";
import { useDispatch } from "react-redux";
import {
  delete_cart_product,
  quantity_increment,
  quantity_decrement,
} from "../../store/reducers/cartReducer";

const ShippingProduct = ({ shop, isShipping }) => {
  const dispatch = useDispatch();
  const incrementCount = (quantity, cartId, stock) => {
    const temp = quantity + 1;

    if (temp <= stock && temp <= 5) {
      dispatch(quantity_increment(cartId));
    }
  };
  const decrementCount = (quantity, cartId, stock) => {
    const temp = quantity - 1;
    if (temp !== 0) {
      dispatch(quantity_decrement(cartId));
    }
  };
  return (
    <div>
      <div>
        {shop.products.map((product) => {
          const { validOfferPercentage } = product;
          const { images, name, brand, price, discount } = product?.productInfo;
          let discountOrOffer =
            discount > validOfferPercentage ? discount : validOfferPercentage;

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

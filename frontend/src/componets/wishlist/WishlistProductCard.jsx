import React from "react";
import { Link } from "react-router-dom";
import Ratings from "./../Ratings";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";

const WishlistProductCard = (product) => {
  const add_cart = () => {};
  return (
    <div>
      <div
        key={1}
        className="border w-[170px] mb-2 group relative transition-all duration-500 hover:-mt-2 hover:shadow-lg rounded-md bg-white"
      >
        {/* Discount & Images & icons for cart view and wishlist*/}
        <div className="relative">
          {/* Discount Badge */}
          <div className="w-[38px] h-[38px] text-[12px] absolute bg-red-700 rounded-full text-white flex justify-center items-center top-4 left-4">
            {1}%
          </div>

          {/* Product Image */}
          <div className="p-2">
            <img
              className="w-full h-[150px] rounded-md"
              src={"http://localhost:3000/images/products/1.webp"}
              alt={"name"}
            />
          </div>

          {/* Hover Action Icons view cart wishlist */}
          <div className="absolute w-full flex justify-center items-center gap-2 -bottom-10 group-hover:bottom-4 transition-all opacity-0 group-hover:opacity-100">
            {/* wishlist */}
            <Link className="h-[38px] w-[38px] bg-white rounded-full flex justify-center items-center shadow-md hover:bg-green-500 hover:text-white text-xl">
              <CiHeart />
            </Link>
            {/* cart */}
            <Link
              onClick={() => {
                add_cart(product?._id);
              }}
              className="h-[38px] w-[38px] bg-white rounded-full flex justify-center items-center shadow-md hover:bg-green-500 hover:text-white text-xl"
            >
              <IoCartOutline />
            </Link>
            {/* view details */}
            <Link
              // to={`/product/details/${product?.slug}`}
              className="h-[38px] w-[38px] bg-white rounded-full flex justify-center items-center shadow-md hover:bg-green-500 hover:text-white text-xl"
            >
              <IoEyeOutline />
            </Link>
          </div>
        </div>
        {/* details */}
        <div className=" text-black font-semibold flex  flex-col gap-2 px-3 my-1 overflow-x-hidden">
          <h2 className="text-[12px] text-slate-600">
            {product?.name ||
              "Acer EK240Y E 23.8 Inch IPS Full HD 1920x1080 Backlit LED LCD Monitor"}
          </h2>
          <div className="flex gap-3">
            <span className="line-through text-red-600">
              {/* ₹ {product?.price} */}
              23233
            </span>

            <span className="text-green-600">
              ₹
              {/* {product.discount
                ? product.price -
                  Math.floor((product.price * product.discount) / 100)
                : product.price}  */}{" "}
              2348
            </span>
          </div>
          <div className="flex">
            <Ratings ratings={product?.rating || 4} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistProductCard;

import React from "react";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import Ratings from "../Ratings";
import { Link } from "react-router-dom";

// this component is for the product to show in the shops page in list and grid feature
const ShopProducts = ({ styles, products }) => {
  return (
    <div
      className={` overflow-x-hidden grid gap-3 ${
        styles === "grid"
          ? "grid-cols-3 md-lg:grid-cols-2 sm:grid-cols-1"
          : "grid-cols-1 "
      }`}
    >
      {products.map((prod) => {
        return (
          <div key={prod._id} className="w-full p-2 overflow-x-hidden">
            <div
              className={`flex transition-all group rounded-md bg-white m-2 sm:w-[60%] xs:w-[70%]  duration-1000 shadow-lg hover:-translate-y-3 ${
                styles === "grid" ? "flex-col h-[350px] " : ""
              }`}
            >
              <div
                className={`overflow-x-hidden p-3 ${
                  styles === "grid" ? "h-[200px]" : ""
                }  `}
              >
                <img
                  className={`object-fill overflow-x-hidden w-full rounded-lg ${
                    styles === "grid" ? "h-[200px]" : "h-[120px]"
                  } `}
                  src={prod.images[0]}
                  alt={prod.name}
                />
                {/* Hover Action Icons */}
                <div
                  className={`absolute  w-full flex justify-center items-center gap-4 -bottom-10  transition-all opacity-0 group-hover:opacity-100 ${
                    styles === "grid"
                      ? "group-hover:bottom-40"
                      : "group-hover:bottom-10"
                  }`}
                >
                  <Link className="h-[38px] w-[38px] bg-slate-300 rounded-full flex justify-center items-center shadow-md hover:bg-green-500 hover:text-white text-xl">
                    <CiHeart />
                  </Link>
                  <Link className="h-[38px] w-[38px] bg-slate-300 rounded-full flex justify-center items-center shadow-md hover:bg-green-500 hover:text-white text-xl">
                    <IoCartOutline />
                  </Link>
                  <Link
                    to={`/product/details/${prod.slug}`}
                    className="h-[38px] w-[38px] bg-slate-300 rounded-full flex justify-center items-center shadow-md hover:bg-green-500 hover:text-white text-xl"
                  >
                    <IoEyeOutline />
                  </Link>
                </div>
              </div>
              {/* details */}
              <div className=" text-black font-semibold flex  flex-col gap-3 px-3 my-2 overflow-x-hidden">
                <h2 className="text-sm">{prod.name}</h2>
                <span className="">
                  {" "}
                  ₹
                  {prod.discount
                    ? prod.price -
                      Math.floor((prod.price * prod.discount) / 100)
                    : prod.price}
                </span>
                <div className="flex">
                  <Ratings ratings={prod.rating} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShopProducts;

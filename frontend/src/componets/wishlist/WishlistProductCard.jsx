import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Ratings from "./../Ratings";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline, IoEyeOutline } from "react-icons/io5";
import { delete_wishlist_products } from "../../store/reducers/wishlistReducer";
import { useDispatch } from "react-redux";
import { add_to_cart } from "./../../store/reducers/cartReducer";

const WishlistProductCard = ({ pro, userInfo }) => {
  const product = pro?.product || {};
  const dispatch = useDispatch();
  const validOfferPercentage = pro.validOfferPercentage;
  const {
    discount = 0,
    images = [],
    name = "",
    price = 0,
    rating = 0,
    slug = "",
    _id = "",
  } = product;
  const wishlistId = pro._id;

  const delete_wishlist = (wishlistId) => {
    dispatch(delete_wishlist_products(wishlistId));
  };

  const add_cart = (id) => {
    const details = {
      userId: userInfo.id,
      quantity: 1,
      productId: id,
    };
    dispatch(add_to_cart(details));
    console.log("Adding to cart", details);
  };

  return (
    <div className="border w-[300px] py-2 shadow-xl flex mb-2 group relative transition-all duration-500 hover:-mt-2 hover:shadow-lg rounded-md bg-white">
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="w-[30px] h-[30px] text-[12px] absolute bg-red-700 rounded-full text-white flex justify-center items-center bottom-2 right-2">
          {discount}%
        </div>
      )}

      {/* Product Image */}
      <div className="p-2">
        <img
          className="w-[120px] h-[100px] rounded-md"
          src={images?.[0] || "/placeholder.png"}
          alt={name}
        />
      </div>

      {/* Hover Action Icons */}
      <div className="absolute w-full flex justify-center items-center gap-2 -bottom-10 group-hover:bottom-4 transition-all opacity-0 group-hover:opacity-100">
        <div
          onClick={() => delete_wishlist(wishlistId)}
          className="h-[38px] w-[38px] bg-white rounded-full flex justify-center items-center shadow-md hover:bg-red-500 hover:text-white text-xl"
        >
          <CiHeart />
        </div>
        <div
          onClick={() => add_cart(_id)}
          className="h-[38px] w-[38px] bg-white rounded-full flex justify-center items-center shadow-md hover:bg-green-500 hover:text-white text-xl"
        >
          <IoCartOutline />
        </div>
        <Link
          to={`/product/details/${slug}`}
          className="h-[38px] w-[38px] bg-white rounded-full flex justify-center items-center shadow-md hover:bg-green-500 hover:text-white text-xl"
        >
          <IoEyeOutline />
        </Link>
      </div>

      {/* Details */}
      <div className="text-black font-semibold flex flex-col gap-2 px-3 my-1 overflow-x-hidden">
        <h2 className="text-[12px] text-slate-600">{name}</h2>
        <div className="flex gap-3">
          {discount > 0 && (
            <span className="line-through text-red-600">₹ {price}</span>
          )}
          <span className="text-green-600">
            ₹
            {discount > 0
              ? price - Math.floor((price * discount) / 100)
              : price}
          </span>
        </div>
        <div className="flex">
          <Ratings ratings={rating} />
        </div>
      </div>
    </div>
  );
};

export default WishlistProductCard;

import React, { useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import Ratings from "../Ratings";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { add_to_cart, messageClear } from "../../store/reducers/cartReducer";
import toast from "react-hot-toast";
import {
  add_to_wishlist,
  messageClearWishlist,
} from "../../store/reducers/wishlistReducer";

const FeaturedProducts = ({ products }) => {
  const { userInfo } = useSelector((store) => store.authUser);
  const { errorMessage, successMessage } = useSelector((store) => store.cart);
  const { wishlistErrorMessage, wishlistSuccessMessage } = useSelector(
    (store) => store.wishlist
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // add to cart
  const add_cart = (productId) => {
    if (userInfo) {
      const details = {
        userId: userInfo.id,
        quantity: 1,
        productId,
      };
      dispatch(add_to_cart(details));
    } else {
      toast.error("Please login to add product to cart");
      navigate("/login");
    }
  };
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);

  // add to wishlist
  const add_wishlist = (product) => {
    if (userInfo) {
      const data = {
        userId: userInfo.id,
        productId: product._id,
      };
      dispatch(add_to_wishlist(data));
    } else {
      toast.error("Please login to add product to wishlist");
      navigate("/login");
    }
  };
  useEffect(() => {
    if (wishlistSuccessMessage) {
      toast.success(wishlistSuccessMessage);
      dispatch(messageClearWishlist());
    }
    if (wishlistErrorMessage) {
      toast.error(wishlistErrorMessage);
      dispatch(messageClearWishlist());
    }
  }, [wishlistErrorMessage, wishlistSuccessMessage, dispatch]);

  return (
    <div className="w-[85%] mx-auto">
      <div className="w-full">
        {/* Heading */}
        <div className="text-center w-full flex flex-col justify-center items-center mb-7">
          <h2 className="text-2xl font-bold">Featured Product</h2>
          <div className="w-[70px] h-[2px] bg-green-700 text-center items-center mt-3"></div>
        </div>

        {/* Content of Featured Products */}
        <div className="w-full gap-10 grid grid-cols-4 xs:grid-cols-1  sm:grid-cols-2  md:grid-cols-2 md-lg:grid-cols-3 lg:grid-cols-4 ">
          {products.map((product) => {
            const {
              _id,
              discount,
              images,
              name,
              slug,
              stock,
              rating,
              price,
              validOfferPercentage,
            } = product;
            let discountOrOffer =
              discount > validOfferPercentage ? discount : validOfferPercentage;
            let flagOfOffer = discount > validOfferPercentage ? false : true;
            return (
              <div
                key={_id}
                className="border group relative transition-all duration-500 hover:-mt-2 hover:shadow-lg rounded-md"
              >
                {/* Discount & Images & icons for cart view and wishlist*/}
                <div className="relative">
                  {/* Discount Badge */}
                  <div className="w-[38px] h-[38px] text-[12px] absolute bg-red-700 rounded-full text-white flex justify-center items-center top-4 left-4">
                    {discountOrOffer}%
                  </div>
                  {flagOfOffer && (
                    <div className=" text-[10px] text-black py-1 absolute bg-yellow-400  flex justify-center items-center rounded-md shadow-md top-2 right-2 px-2">
                      Category Offer
                    </div>
                  )}

                  {/* Product Image */}
                  <div className="p-2">
                    <img
                      className="w-full h-[240px] rounded-md"
                      src={images[0]}
                      alt={name}
                    />
                  </div>

                  {/* Hover Action Icons view cart wishlist */}
                  <div className="absolute w-full flex justify-center items-center gap-2 -bottom-10 group-hover:bottom-4 transition-all opacity-0 group-hover:opacity-100">
                    {/* wishlist */}
                    <div
                      onClick={() => {
                        add_wishlist(product);
                      }}
                      className="h-[38px] w-[38px] cursor-pointer bg-white rounded-full flex justify-center items-center shadow-md hover:bg-green-500 hover:text-white text-xl"
                    >
                      <CiHeart />
                    </div>
                    {/* cart */}
                    <div
                      onClick={() => {
                        add_cart(_id);
                      }}
                      className="h-[38px] w-[38px] cursor-pointer bg-white rounded-full flex justify-center items-center shadow-md hover:bg-green-500 hover:text-white text-xl"
                    >
                      <IoCartOutline />
                    </div>
                    {/* view details */}
                    <Link
                      to={`/product/details/${slug}`}
                      className="h-[38px] w-[38px] bg-white rounded-full flex justify-center items-center shadow-md hover:bg-green-500 hover:text-white text-xl"
                    >
                      <IoEyeOutline />
                    </Link>
                  </div>
                </div>
                {/* details */}
                <div className=" text-black font-semibold flex  flex-col gap-2 px-3 my-1 overflow-x-hidden">
                  <h2 className="text-sm">{name}</h2>
                  <div className="flex gap-3">
                    <span className="line-through text-red-600">₹ {price}</span>
                    <span className="text-green-600">
                      ₹
                      {discountOrOffer
                        ? price - Math.floor((price * discountOrOffer) / 100)
                        : price}
                    </span>
                  </div>
                  <div className="text-slate-600 text-[12px]">
                    stock left: {stock ? stock : "out of stock"}
                  </div>
                  <div className="flex">
                    <Ratings ratings={rating} />
                  </div>
                </div>
              </div>
            );
          })}
          {/* end of map  */}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;

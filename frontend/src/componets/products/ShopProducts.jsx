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
// this component is for the product to show in the shops page in list and grid feature
const ShopProducts = ({ styles, products }) => {
  const { userInfo } = useSelector((store) => store.authUser);
  const { errorMessage, successMessage } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { WishlistErrorMessage, wishlistSuccessMessage } = useSelector(
    (store) => store.wishlist
  );
  // add to cart
  const add_cart = (productId) => {
    if (userInfo) {
      const details = {
        userId: userInfo.id,
        quantity: 1,
        productId,
      };
      console.log(details);
      dispatch(add_to_cart(details));
    } else {
      toast.error("Please login to add product to cart");
      navigate("/login");
    }
  };
  // toaster message for success and failure
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
    const data = {
      userId: userInfo.id,
      productId: product._id,
    };
    dispatch(add_to_wishlist(data));
  };
  useEffect(() => {
    if (wishlistSuccessMessage) {
      toast.success(wishlistSuccessMessage);
      dispatch(messageClearWishlist());
    }
    if (WishlistErrorMessage) {
      toast.error(WishlistErrorMessage);
      dispatch(messageClearWishlist());
    }
  }, [WishlistErrorMessage, wishlistSuccessMessage, dispatch]);

  return (
    <div
      className={` overflow-x-hidden grid gap-3 ${
        styles === "grid"
          ? "grid-cols-3 md-lg:grid-cols-2  sm:grid-cols-2 xs:grid-cols-1"
          : "grid-cols-1 "
      }`}
    >
      {products.map((prod) => {
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
        } = prod;
        let discountOrOffer =
          discount > validOfferPercentage ? discount : validOfferPercentage;
        let flagOfOffer = discount > validOfferPercentage ? false : true;

        return (
          <div key={_id} className="w-full p-2 overflow-hidden">
            <div
              className={`flex transition-all relative group rounded-md bg-white m-2   duration-1000 shadow-lg hover:-translate-y-3 ${
                styles === "grid" ? "flex-col h-[350px] " : ""
              }`}
            >
              {/* Discount Badge */}
              <div className="w-[38px] h-[38px] text-[12px] z-50 absolute bg-red-700 rounded-full text-white flex justify-center items-center top-4 left-4">
                {discountOrOffer}%
              </div>
              {flagOfOffer && (
                <div className=" text-[10px] text-black py-1 absolute bg-yellow-400  flex justify-center items-center rounded-md shadow-md top-2 right-2 px-2">
                  Category Offer
                </div>
              )}
              <div
                className={`overflow-hidden p-3 ${
                  styles === "grid" ? "h-[200px]" : ""
                }  `}
              >
                <img
                  className={`object-fill overflow-hidden w-full rounded-lg ${
                    styles === "grid" ? "h-[200px]" : "h-[120px]"
                  } `}
                  src={images[0]}
                  alt={name}
                />
                {/* Hover Action Icons */}
                <div
                  className={`absolute flex w-[150px]  bottom-10 left-10 justify-center items-center gap-4   transition-all opacity-0 group-hover:opacity-100 ${
                    styles === "grid"
                      ? "group-hover:bottom-40 group-hover:left-10"
                      : "group-hover:bottom-10 group-hover:left-64 group-hover:md:left-3 "
                  }`}
                >
                  <div
                    onClick={() => {
                      add_wishlist(prod);
                    }}
                    className="h-[38px] w-[38px] bg-white rounded-full flex justify-center items-center shadow-md hover:bg-green-500 hover:text-white text-xl"
                  >
                    <CiHeart />
                  </div>
                  <div
                    onClick={() => {
                      add_cart(_id);
                    }}
                    className="h-[38px] w-[38px] bg-white rounded-full flex justify-center items-center shadow-md hover:bg-green-500 hover:text-white text-xl"
                  >
                    <IoCartOutline />
                  </div>
                  <Link
                    to={`/product/details/${slug}`}
                    className="h-[38px] w-[38px] bg-white  rounded-full flex justify-center items-center shadow-md hover:bg-green-500 hover:text-white text-xl"
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
          </div>
        );
      })}
    </div>
  );
};

export default ShopProducts;

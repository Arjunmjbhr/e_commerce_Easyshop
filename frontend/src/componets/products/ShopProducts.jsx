import React, { useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import Ratings from "../Ratings";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { add_to_cart, messageClear } from "../../store/reducers/cartReducer";
import toast from "react-hot-toast";

// this component is for the product to show in the shops page in list and grid feature
const ShopProducts = ({ styles, products }) => {
  const { userInfo } = useSelector((store) => store.authUser);
  const { errorMessage, successMessage } = useSelector((store) => store.cart);
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
      console.log(details);
      dispatch(add_to_cart(details));
    } else {
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
  return (
    <div
      className={` overflow-x-hidden grid gap-3 ${
        styles === "grid"
          ? "grid-cols-3 md-lg:grid-cols-2  sm:grid-cols-2 xs:grid-cols-1"
          : "grid-cols-1 "
      }`}
    >
      {products.map((prod) => {
        return (
          <div key={prod._id} className="w-full p-2 overflow-hidden">
            <div
              className={`flex transition-all relative group rounded-md bg-white m-2   duration-1000 shadow-lg hover:-translate-y-3 ${
                styles === "grid" ? "flex-col h-[350px] " : ""
              }`}
            >
              {/* Discount Badge */}
              <div className="w-[38px] h-[38px] text-[12px] z-50 absolute bg-red-700 rounded-full text-white flex justify-center items-center top-4 right-4">
                {prod.discount}%
              </div>
              <div
                className={`overflow-hidden p-3 ${
                  styles === "grid" ? "h-[200px]" : ""
                }  `}
              >
                <img
                  className={`object-fill overflow-hidden w-full rounded-lg ${
                    styles === "grid" ? "h-[200px]" : "h-[120px]"
                  } `}
                  src={prod.images[0]}
                  alt={prod.name}
                />
                {/* Hover Action Icons */}
                <div
                  className={`absolute flex w-[150px]  bottom-10 left-10 justify-center items-center gap-4   transition-all opacity-0 group-hover:opacity-100 ${
                    styles === "grid"
                      ? "group-hover:bottom-40 group-hover:left-10"
                      : "group-hover:bottom-10 group-hover:left-64 group-hover:md:left-3 "
                  }`}
                >
                  <div className="h-[38px] w-[38px] bg-white rounded-full flex justify-center items-center shadow-md hover:bg-green-500 hover:text-white text-xl">
                    <CiHeart />
                  </div>
                  <div
                    onClick={() => {
                      add_cart(prod._id);
                    }}
                    className="h-[38px] w-[38px] bg-white rounded-full flex justify-center items-center shadow-md hover:bg-green-500 hover:text-white text-xl"
                  >
                    <IoCartOutline />
                  </div>
                  <Link
                    to={`/product/details/${prod.slug}`}
                    className="h-[38px] w-[38px] bg-white  rounded-full flex justify-center items-center shadow-md hover:bg-green-500 hover:text-white text-xl"
                  >
                    <IoEyeOutline />
                  </Link>
                </div>
              </div>
              {/* details */}
              <div className=" text-black font-semibold flex  flex-col gap-2 px-3 my-1 overflow-x-hidden">
                <h2 className="text-sm">{prod.name}</h2>
                <div className="flex gap-3">
                  <span className="line-through text-red-600">
                    ₹ {prod.price}
                  </span>
                  <span className="text-green-600">
                    ₹
                    {prod.discount
                      ? prod.price -
                        Math.floor((prod.price * prod.discount) / 100)
                      : prod.price}
                  </span>
                </div>
                <div className="text-slate-600 text-[12px]">
                  stock left: {prod.stock ? prod.stock : "out of stock"}
                </div>
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

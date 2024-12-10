import React, { useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import Ratings from "../Ratings";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { add_to_cart, messageClear } from "../../store/reducers/cartReducer";
import toast from "react-hot-toast";

const FeaturedProducts = ({ products }) => {
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
    <div className="w-[85%] mx-auto">
      <div className="w-full">
        {/* Heading */}
        <div className="text-center w-full flex flex-col justify-center items-center mb-7">
          <h2 className="text-2xl font-bold">Featured Product</h2>
          <div className="w-[70px] h-[2px] bg-green-700 text-center items-center mt-3"></div>
        </div>

        {/* Content of Featured Products */}
        <div className="w-full gap-10 grid grid-cols-4 xs:grid-cols-1  sm:grid-cols-2  md:grid-cols-2 md-lg:grid-cols-3 lg:grid-cols-4 ">
          {products.map((product) => (
            <div
              key={product._id}
              className="border group relative transition-all duration-500 hover:-mt-2 hover:shadow-lg rounded-md"
            >
              {/* Discount & Images & icons for cart view and wishlist*/}
              <div className="relative">
                {/* Discount Badge */}
                <div className="w-[38px] h-[38px] text-[12px] absolute bg-red-700 rounded-full text-white flex justify-center items-center top-4 left-4">
                  {product.discount}%
                </div>

                {/* Product Image */}
                <div className="p-2">
                  <img
                    className="w-full h-[240px] rounded-md"
                    src={product.images[0]}
                    alt={product.name}
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
                      add_cart(product._id);
                    }}
                    className="h-[38px] w-[38px] bg-white rounded-full flex justify-center items-center shadow-md hover:bg-green-500 hover:text-white text-xl"
                  >
                    <IoCartOutline />
                  </Link>
                  {/* view details */}
                  <Link
                    to={`/product/details/${product.slug}`}
                    className="h-[38px] w-[38px] bg-white rounded-full flex justify-center items-center shadow-md hover:bg-green-500 hover:text-white text-xl"
                  >
                    <IoEyeOutline />
                  </Link>
                </div>
              </div>
              {/* details */}
              <div className="px-3 text-black font-semibold m-3 flex flex-col gap-2">
                <h2 className="text-sm">{product.name}</h2>
                <span className="font-bold">
                  ₹
                  {product.discount
                    ? product.price -
                      Math.floor((product.price * product.discount) / 100)
                    : product.price}
                </span>
                <div className="flex">
                  <Ratings ratings={product.rating} />
                </div>
              </div>
            </div>
          ))}
          {/* end of map  */}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;

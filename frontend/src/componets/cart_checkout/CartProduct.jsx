import React from "react";
import { useDispatch } from "react-redux";
import {
  delete_cart_product,
  quantity_increment,
} from "../../store/reducers/cartReducer";

const CartProduct = ({ shop }) => {
  const dispatch = useDispatch();
  const incrementCount = (quantity, cartId, stock) => {
    const temp = quantity + 1;
    if (temp <= stock) {
      dispatch(quantity_increment(cartId));
    }
  };
  return (
    <div>
      <div>
        {shop.products.map((product) => (
          <div className="w-full flex flex-wrap bg-white ">
            <div className="flex sm:w-full gap-2 w-6/12">
              <div className="flex justify-start items-center ">
                <img
                  className="w-[100px] h-[100px] p-2"
                  src={product?.productInfo?.images[0] || product?.images[0]}
                  alt="product images"
                />
              </div>
              <div className="pr-4 text-slate-600">
                <h2 className="text-sm font-semibold">
                  {product?.productInfo?.name || product.name}
                </h2>
                <span className="text-sm">
                  Brand: {product?.productInfo?.brand || product?.brand}
                </span>
              </div>
            </div>
            <div className="flex justify-between w-5/12 sm:w-full sm:mt-3">
              <div className="pl-4 sm:pl-0 text-md">
                <h2 className=" text-orange-500">
                  ₹
                  {product?.productInfo?.price -
                    Math.floor(
                      (product?.productInfo?.price *
                        product?.productInfo?.discount) /
                        100
                    ) ||
                    product?.price -
                      Math.floor((product?.price * product?.discount) / 100)}
                </h2>
                <p className="line-through">
                  ₹{product?.productInfo?.price || product?.price}
                </p>
                <p> -{product?.productInfo?.discount || product?.discount}%</p>
              </div>
              <div className="flex flex-col gap-2 justify-center items-center">
                {/* button for adding and reducing */}
                <div className="flex bg-slate-200 h-[30px] justify-center items-center text-lg">
                  <div className="cursor-pointer px-2 text-2xl">-</div>
                  <div className="cursor-pointer px-2">{product.quantity}</div>
                  <div
                    onClick={() =>
                      incrementCount(
                        product.quantity,
                        product._id,
                        product.productInfo.stock
                      )
                    }
                    className="cursor-pointer px-2"
                  >
                    +
                  </div>
                </div>
                {/* button for delete item in the cart */}
                <div>
                  <button
                    onClick={() => dispatch(delete_cart_product(product._id))}
                    className="px-5 bg-red-500 text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartProduct;

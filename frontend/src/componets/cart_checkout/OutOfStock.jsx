import React from "react";
import { useDispatch } from "react-redux";
import {
  delete_cart_product,
  quantity_decrement,
} from "../../store/reducers/cartReducer";

const OutOfStock = ({ outofstock_products }) => {
  const dispatch = useDispatch();
  const decrementCount = (quantity, cartId, stock) => {
    const temp = quantity - 1;
    if (temp !== 0) {
      dispatch(quantity_decrement(cartId));
    }
  };

  return (
    <div className="mt-3">
      {outofstock_products.map((cart) => (
        <div className="bg-white p-4 flex flex-col gap-2 mt-2">
          <div className="w-full flex flex-wrap bg-white ">
            <div className="flex sm:w-full gap-2 w-6/12">
              <div className="flex justify-start items-center ">
                <img
                  className="w-[100px] h-[100px] p-2"
                  src={cart.products[0]?.images[0]}
                  alt="product images"
                />
              </div>
              <div className="pr-4 text-slate-600">
                <h2 className="text-sm font-semibold">
                  {cart.products[0].name}
                </h2>
                <span className="text-sm">Brand: {cart.products[0].brand}</span>
              </div>
            </div>
            <div className="flex justify-between w-5/12 sm:w-full sm:mt-3">
              <div className="pl-4 sm:pl-0 text-md">
                <h2 className=" text-orange-500">
                  ₹
                  {cart.products[0]?.price -
                    Math.floor(
                      (cart.products[0]?.price * cart.products[0].discount) /
                        100
                    )}
                </h2>
                <p className="line-through">₹{cart.products[0]?.price}</p>
                <p> -{cart.products[0].discount}%</p>
              </div>
              <div className="flex flex-col gap-2 justify-center items-center">
                {/* increment and decremetn */}
                <div className="flex bg-slate-200 h-[30px] justify-center items-center text-lg">
                  <div
                    onClick={() => decrementCount(cart.quantity, cart._id)}
                    className="cursor-pointer px-2 text-2xl"
                  >
                    -
                  </div>
                  <div className="cursor-pointer px-2">{cart.quantity}</div>
                  <div className="cursor-pointer px-2">+</div>
                </div>
                {/* button for delete item in the cart */}
                <div>
                  <button
                    onClick={() => dispatch(delete_cart_product(cart._id))}
                    className="px-5 bg-red-500 text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OutOfStock;

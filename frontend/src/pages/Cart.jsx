import React, { useEffect } from "react";
import Header from "./../componets/Header";
import Footer from "../componets/Footer";
import PageHeading from "../componets/PageHeading";
import { Link, useNavigate } from "react-router-dom";
import CartProductDetails from "../componets/cart_checkout/CartProductDetails";
import OrderSummaryCart from "../componets/cart_checkout/OrderSummaryCart";
import { useDispatch, useSelector } from "react-redux";
import { get_cart_products, messageClear } from "../store/reducers/cartReducer";
import OutOfStock from "../componets/cart_checkout/OutOfStock";
import toast from "react-hot-toast";
import { placeOrderErrorMessageClear } from "../store/reducers/orderReducer";

const Cart = () => {
  const {
    cart_products,
    successMessage,
    price,
    buy_product_item,
    shipping_fee,
    outofstock_products,
  } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((store) => store.authUser);

  //function for chekout
  const redirectToCheckout = () => {
    navigate("/shipping", {
      state: {
        products: cart_products,
        price: price,
        shipping_fee: shipping_fee,
        items: buy_product_item,
      },
    });
  };

  //useEffect for geting cart data
  const { placeOrderErrorMessage } = useSelector((store) => store.order);

  useEffect(() => {
    dispatch(get_cart_products(userInfo.id));
  }, [dispatch, userInfo.id]);
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      dispatch(get_cart_products(userInfo.id));
    }
    if (placeOrderErrorMessage) {
      toast.error(placeOrderErrorMessage);
      dispatch(placeOrderErrorMessageClear());
    }
  }, [successMessage, dispatch, userInfo.id, placeOrderErrorMessage]);

  return (
    <div>
      <Header />
      {/* page heading and breadcrumbs */}
      <section>
        <PageHeading
          heading=" Your Cart Details"
          breadcrumbs={{
            Home: "/",
            Cart: "/cart",
          }}
        />
      </section>
      {/* product details and checkout page */}
      <section className="bg-[#eee]">
        <div className="w-[85%] lg:w-[90%] mx-auto py-16 ">
          {/* condition to check cart empty or not */}
          {cart_products.length > 0 || outofstock_products.length > 0 ? (
            <div className="flex flex-wrap">
              {/* product details */}
              <div className="w-[67%] md-lg:w-full">
                <div className="pr-3 md-lg:pr-0">
                  {/* stocked products */}
                  <div className="flex flex-col gap-4">
                    {/* heading stocked products */}
                    <div className="bg-white p-4 rounded-md">
                      <h2 className="font-bold text-md text-green-700">
                        Stocked Products - {cart_products.length}
                      </h2>
                    </div>
                    {/* content stocked products */}
                    <div className="mt-3">
                      <CartProductDetails cart_products={cart_products} />
                    </div>
                  </div>
                  {/* out of stcoked products */}
                  {outofstock_products.length > 0 && (
                    <div className="mt-5">
                      {/* heading stocked products */}
                      <div className=" p-4 rounded-md bg-white ">
                        <h2 className="font-bold text-md text-green-700">
                          outOfStocked Products - {outofstock_products.length}
                        </h2>
                      </div>
                      <div className="mt-3">
                        {/*  cart items */}

                        <OutOfStock outofstock_products={outofstock_products} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* checkout tab */}
              <div className="w-[33%] md-lg:w-full">
                <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
                  {cart_products.length > 0 && (
                    <OrderSummaryCart
                      shipping_fee={shipping_fee}
                      buy_product_item={buy_product_item}
                      price={price}
                      redirectToCheckout={redirectToCheckout}
                    />
                  )}
                </div>
              </div>
            </div>
          ) : (
            // when  empty cart
            <div className="flex justify-center items-center flex-wrap gap-4">
              <div className="font-bold text-xl">Cart is Empty </div>
              <Link
                to="/shops"
                className="bg-indigo-700 py-2 px-3 rounded-lg text-white hover:bg-indigo-800"
              >
                Shop Now
              </Link>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Cart;

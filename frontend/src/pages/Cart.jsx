import React from "react";
import Header from "./../componets/Header";
import Footer from "../componets/Footer";
import PageHeading from "../componets/PageHeading";
import { Link, useNavigate } from "react-router-dom";
import CartProductDetails from "../componets/cart_checkout/CartProductDetails";
import OrderSummaryCart from "../componets/cart_checkout/OrderSummaryCart";

const Cart = () => {
  const navigate = useNavigate();
  const cartProducts = [1, 2];
  const outOfStockProducts = [1, 2];
  const redirectToCheckout = () => {
    navigate("/shipping", {
      state: {
        products: [],
        price: 500,
        shipping_fee: 40,
        items: 2,
      },
    });
  };
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
          {cartProducts.length > 0 || outOfStockProducts.length > 0 ? (
            <div className="flex flex-wrap">
              {/* product details */}
              <div className="w-[67%] md-lg:w-full">
                <div className="pr-3 md-lg:pr-0">
                  {/* stocked products */}
                  <div className="flex flex-col gap-4">
                    {/* heading stocked products */}
                    <div className="bg-white p-4 rounded-md">
                      <h2 className="font-bold text-md text-green-700">
                        Stocked Products - {cartProducts.length}
                      </h2>
                    </div>
                    {/* content stocked products */}
                    <div className="mt-3">
                      <CartProductDetails />
                    </div>
                  </div>
                  {/* out of stcoked products */}
                  {outOfStockProducts.length > 0 && (
                    <div className="mt-5">
                      {/* heading stocked products */}
                      <div className=" p-4 rounded-md bg-white ">
                        <h2 className="font-bold text-md text-green-700">
                          outOfStocked Products - {outOfStockProducts.length}
                        </h2>
                      </div>
                      <div className="mt-3">
                        {/*  cart items */}

                        <CartProductDetails />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* checkout tab */}
              <div className="w-[33%] md-lg:w-full">
                <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
                  {cartProducts.length > 0 && (
                    <OrderSummaryCart redirectToCheckout={redirectToCheckout} />
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

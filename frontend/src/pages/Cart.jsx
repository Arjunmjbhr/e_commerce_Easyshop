import React from "react";
import Header from "./../componets/Header";
import Footer from "../componets/Footer";
import PageHeading from "../componets/PageHeading";
import { Link } from "react-router-dom";
import CartProductDetails from "../componets/CartProductDetails";

const Cart = () => {
  const cartProducts = [1, 2];
  const outOfStockProducts = [1, 2];
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
                    {cartProducts.map(() => {
                      return (
                        <div className="bg-white p-4 flex flex-col gap-2">
                          <div>
                            <h2 className="text-md text-slate-600 font-semibold">
                              EasyShop
                            </h2>
                          </div>
                          <div>
                            {/*  cart items */}
                            {[1, 2].map(() => (
                              <CartProductDetails />
                            ))}
                          </div>
                        </div>
                      );
                    })}
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
                        {[1, 2].map(() => (
                          <CartProductDetails />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* checkout tab */}
              <div className="w-[33%] md-lg:w-full">
                <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
                  {cartProducts.length > 0 && (
                    <div className="bg-white p-3 text-slate-600 flex flex-col gap-3">
                      <h2 className="text-xl font-bold">Order Summary</h2>
                      <div className="flex justify-between items-center">
                        <span>2 Items </span>
                        <span>₹343 </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Shipping Fee </span>
                        <span>₹40 </span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-green-500 rounded-sm"
                          type="text"
                          placeholder="Input Vauchar Coupon"
                        />
                        <button className="px-5 py-[1px] bg-[#059473] text-white rounded-sm uppercase text-sm">
                          Apply
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Total</span>
                        <span className="text-lg text-[#059473]">₹430 </span>
                      </div>
                      <button className="px-5 py-[6px] rounded-sm hover:shadow-red-500/50 hover:shadow-lg bg-red-500 text-sm text-white uppercase ">
                        Process to Checkout
                      </button>
                    </div>
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

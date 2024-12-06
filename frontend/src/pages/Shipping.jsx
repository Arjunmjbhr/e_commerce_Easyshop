import React, { useState } from "react";
import Header from "../componets/Header";
import Footer from "../componets/Footer";
import PageHeading from "../componets/PageHeading";
import { useLocation } from "react-router-dom";
import AddressForm from "../componets/AddressForm";
import CartProductDetails from "../componets/cart_checkout/CartProductDetails";
import OrderSummaryShipping from "../componets/cart_checkout/OrderSummaryShipping";
import { useDispatch, useSelector } from "react-redux";
import { place_order } from "../store/reducers/orderReducer";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    state: { products, price, shipping_fee, items },
  } = useLocation();
  const [res, setRes] = useState(false);
  const [inputState, setInputState] = useState({
    name: "",
    address: "",
    phone: "",
    post: "",
    district: "",
    city: "",
    area: "",
  });
  const { userInfo } = useSelector((store) => store.authUser);

  //   handling form input
  const inputHandle = (e) => {
    const { name, value } = e.target;
    setInputState({
      ...inputState,
      [name]: value,
    });
    console.log(inputState);
  };

  const save = (e) => {
    e.preventDefault();
    const { name, address, phone, post, district, city, area } = inputState;
    if (name && address && phone && post && district && city && area) {
      setRes(true);
    }
  };
  const placeOrder = () => {
    const data = {
      price,
      products,
      shipping_fee,
      items,
      shippingInfo: inputState,
      userId: userInfo.id,
      navigate,
    };
    dispatch(place_order(data));
  };

  return (
    <div>
      <Header />
      <PageHeading
        heading="Shopping Page"
        breadcrumbs={{
          Home: "/",
          cart: "/cart",
          shipping: "shipping",
        }}
      />
      <section>
        <div className="bg-[#eee]">
          <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16">
            <div className="w-full flex flex-wrap">
              <div className="w-[67%] md-lg:w-full">
                {/* address */}
                <div className="bg-white p-6 shadow-sm rounded-md">
                  <h2 className="text-lg font-bold mb-5">
                    Shipping Information
                  </h2>
                  {/* address edit and show */}
                  <div>
                    {/* addressinput form */}
                    {!res && (
                      <div>
                        <AddressForm
                          inputState={inputState}
                          inputHandle={inputHandle}
                          save={save}
                        />
                      </div>
                    )}
                    {/* address show */}
                    {res && (
                      <div className="flex flex-col gap-1">
                        <h2 className="text-slate-600 font-semibold pb-2">
                          Deliver To {inputState.name}
                        </h2>
                        <p>
                          <span className="bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2 py-1 rounded">
                            Home
                          </span>
                          <span className="lowercase">
                            {inputState.address},{inputState.district},
                            {inputState.city},{inputState.area},
                            {inputState.phone},{`post: ${inputState.post}`}
                          </span>
                          <span
                            onClick={() => setRes(false)}
                            className="text-indigo-500 cursor-pointer mx-2"
                          >
                            Change
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                {/* product details */}
                <div className="mt-3">
                  <CartProductDetails
                    cart_products={products}
                    isShipping={true}
                  />
                </div>
              </div>
              {/* order summary */}
              <div className="w-[33%] md-lg:w-full pr-3">
                <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
                  <OrderSummaryShipping
                    res={res}
                    placeOrder={placeOrder}
                    price={price}
                    shipping_fee={shipping_fee}
                    items={items}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Shipping;

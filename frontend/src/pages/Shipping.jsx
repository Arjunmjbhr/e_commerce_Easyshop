import React, { useState, useEffect } from "react";
import Header from "../componets/Header";
import Footer from "../componets/Footer";
import PageHeading from "../componets/PageHeading";
import { useLocation } from "react-router-dom";
import AddressForm from "../componets/AddressForm";
import OrderSummaryShipping from "../componets/cart_checkout/OrderSummaryShipping";
import { useDispatch, useSelector } from "react-redux";
import { place_order } from "../store/reducers/orderReducer";
import { useNavigate } from "react-router-dom";
import {
  get_user_profile,
  messageClear,
  add_address,
  update_address,
} from "./../store/reducers/authUserReducer";
import AddressItration from "../componets/cart_checkout/AddressItration";
import toast from "react-hot-toast";
import ShippingProductDetails from "../componets/cart_checkout/shippingProductDetails";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAddressEditing, setIsAddressEditing] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [isAddressSelected, setIsAddressSelected] = useState(false);

  const {
    state: { products, price, shipping_fee, items },
  } = useLocation();
  const [res, setRes] = useState(true);
  const [inputState, setInputState] = useState({
    name: "",
    address: "",
    phone: "",
    post: "",
    district: "",
    city: "",
    area: "",
  });
  const { userInfo, addressUser, successMessage, errorMessage } = useSelector(
    (store) => store.authUser
  );

  useEffect(() => {
    dispatch(get_user_profile(userInfo.id));
  }, [successMessage, dispatch, userInfo]);

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

  const saveAddress = (e) => {
    e.preventDefault();
    console.log("save");

    const { name, address, phone, post, district, city, area } = inputState;

    if (
      !name.trim() ||
      !address.trim() ||
      !phone.trim() ||
      !post.trim() ||
      !district.trim() ||
      !city.trim() ||
      !area.trim()
    ) {
      toast.error("All fields are mandatory");
      return;
    }

    if (isAddressEditing) {
      const { addressId } = inputState;
      const data = {
        info: inputState,
        addressId,
      };
      console.log(data);
      dispatch(update_address(data));
      setIsAddressEditing(false);
    } else {
      const data = {
        userId: userInfo?.id,
        info: inputState,
      };
      dispatch(add_address(data));
    }

    setInputState({
      name: "",
      address: "",
      phone: "",
      post: "",
      district: "",
      city: "",
      area: "",
    });
    setRes(true);
  };
  const handleCancelAdd = () => {
    setRes(!res);
    setIsAddressEditing(false);
    setInputState({
      name: "",
      address: "",
      phone: "",
      post: "",
      district: "",
      city: "",
      area: "",
    });
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
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold mb-5">
                      Shipping Information
                    </h2>
                    <div
                      onClick={() => handleCancelAdd()}
                      className={` py-2 px-3 rounded-md cursor-pointer ${
                        res ? "bg-green-400" : "bg-slate-400"
                      }`}
                    >
                      {res ? "Add new +" : "Cancel"}
                    </div>
                  </div>
                  {/* address edit and show */}
                  <div>
                    {/* addressinput form */}
                    {!res && (
                      <div>
                        <AddressForm
                          inputState={inputState}
                          inputHandle={inputHandle}
                          setInputState={setInputState}
                          saveAddress={saveAddress}
                          isAddressEditing={isAddressEditing}
                          setIsAddressEditing={setIsAddressEditing}
                        />
                      </div>
                    )}
                    {/* address show */}
                    {res &&
                      addressUser.map((address) => (
                        <AddressItration
                          key={address._id}
                          address={address}
                          inputState={inputState}
                          setInputState={setInputState}
                          setRes={setRes}
                          isAddressEditing={isAddressEditing}
                          setIsAddressEditing={setIsAddressEditing}
                          selectedOption={selectedOption}
                          setSelectedOption={setSelectedOption}
                          setIsAddressSelected={setIsAddressSelected}
                        />
                      ))}
                  </div>
                </div>
                {/* product details */}
                <div className="mt-3">
                  <ShippingProductDetails
                    cart_products={products}
                    isShipping={true}
                  />
                </div>
              </div>
              {/* order summary */}
              <div className="w-[33%] md-lg:w-full pr-3">
                <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
                  <OrderSummaryShipping
                    selectedOption={selectedOption}
                    isAddressSelected={isAddressSelected}
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

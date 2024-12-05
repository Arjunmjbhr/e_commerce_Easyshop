import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaList } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";
import HeaderSidebar from "./Header/HeaderSidebar";
import HeaderSearchAndCategory from "./Header/HeaderSearchAndCategory";
import HeaderTop from "./Header/HeaderTop";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("");
  const wishlist_count = 5;
  const { userInfo } = useSelector((store) => store.authUser);
  const { cart_product_count } = useSelector((store) => store.cart);
  const { categories } = useSelector((store) => store.home);
  // search onclick handle
  const search = () => {
    navigate(
      `/products/search?category=${category}&&searchValue=${searchValue}`
    );
  };
  // cart icon on click handle
  const redirect_card_page = () => {
    if (userInfo) {
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="w-full bg-white relative">
      {/* first header */}
      <div className="header-top bg-green-300 md-lg:hidden ">
        <div>
          <HeaderTop userInfo={userInfo} />
        </div>
      </div>
      {/* second layer of header */}
      <div className="">
        <div className=" w-[85%] lg:w-[90%] mx-auto  ">
          <div className="h-[80px] md-lg:[100px] flex justify-between items-center ">
            {/* logo */}
            <div className="flex justify-between items-center w-3/12 md-lg:w-full  ">
              <Link to="/">
                <img
                  className="h-[60px]"
                  src="http://localhost:3000/images/logo.png"
                  alt=""
                />
              </Link>
              {/* menu icon for small to lg-md screen*/}
              <div
                onClick={() => setShowSidebar(!showSidebar)}
                className="hidden md-lg:flex cursor-pointer text-2xl hover:bg-black w-10 h-10 rounded-full justify-center items-center hover:text-white"
              >
                <FaList />
              </div>
            </div>
            {/* nav bar */}
            <div className="w-9/12 md-lg:w-full md-lg:hidden  ">
              <div className="">
                <ul className="flex justify-center items-center gap-10 font-bold">
                  <Link to="/">
                    <li
                      className={`cursor-pointer px-3 py-2 rounded-md ${
                        pathname === "/" ? "bg-blue-700 text-white" : ""
                      } `}
                    >
                      Home
                    </li>
                  </Link>
                  <Link to="/shops">
                    <li
                      className={`cursor-pointer px-3 py-2 rounded-md ${
                        pathname === "/shops" ? "bg-blue-700 text-white" : ""
                      } `}
                    >
                      Shop
                    </li>
                  </Link>
                  <li
                    className={`cursor-pointer px-3 py-2 rounded-md ${
                      pathname === "/blog" ? "bg-blue-700 text-white" : ""
                    } `}
                  >
                    Blog
                  </li>
                  <li
                    className={`cursor-pointer px-3 py-2 rounded-md ${
                      pathname === "/contact" ? "bg-blue-700 text-white" : ""
                    } `}
                  >
                    Contact Us
                  </li>
                </ul>
              </div>
            </div>
            {/* cart & wishlist */}
            <div className="md-lg:hidden flex justify-center items-center gap-6 ">
              {/* wishlist */}
              <div className="relative">
                <span className="text-green-600 w-[30px] cursor-pointer h-[30px] rounded-full bg-slate-200 flex justify-center items-center text-lg ">
                  <FaHeart />
                </span>
                <div className="text-white text-[10px]  absolute w-[17px] h-[17px] -top-[5px] -right-[5px] bg-red-600 rounded-full flex justify-center items-center">
                  {wishlist_count}
                </div>
              </div>
              {/* cart*/}
              <div onClick={redirect_card_page} className="relative">
                <span className="text-green-600 w-[30px] h-[30px] cursor-pointer rounded-full bg-slate-200 flex justify-center items-center text-xl ">
                  <MdShoppingCart />
                </span>
                {cart_product_count !== 0 && (
                  <div className="text-white text-[10px]  absolute w-[17px] h-[17px] -top-[5px] -right-[5px] bg-red-600 rounded-full flex justify-center items-center">
                    {cart_product_count}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* responsive side bar for screen md-lg */}
      <div className="hidden md-lg:block">
        {/* sidebar screen bluer background */}
        <div
          onClick={() => {
            setShowSidebar(!showSidebar);
          }}
          className={`bg-black absolute top-0 left-0 transition-all duration-200  w-screen h-screen opacity-30 z-20 ${
            showSidebar ? "visible" : "invisible"
          } `}
        ></div>
        {/* sidebar */}
        <div
          className={`fixed transition-all z-[500] duration-200 py-8 px-6  w-[270px] h-screen top-0  bg-white ${
            showSidebar ? "left-0" : "-left-[350px]"
          }`}
        >
          <HeaderSidebar
            setShowSidebar={setShowSidebar}
            showSidebar={showSidebar}
            userInfo={userInfo}
            pathname={pathname}
          />
        </div>
      </div>
      {/* third layer of header */}
      <div className="w-[85%] lg:w-[90%] mx-auto  ">
        <HeaderSearchAndCategory
          setShowCategory={setShowCategory}
          showCategory={showCategory}
          categories={categories}
          setCategory={setCategory}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          search={search}
        />
      </div>
    </div>
  );
};

export default Header;

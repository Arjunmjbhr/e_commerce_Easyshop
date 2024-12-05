import React from "react";
import { Link } from "react-router-dom";
import { IoIosCall } from "react-icons/io";
import { IoMdCloseCircle } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { CiFacebook } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
const HeaderSidebar = ({ setShowSidebar, showSidebar, userInfo, pathname }) => {
  return (
    <div>
      <div className="flex flex-col justify-start  gap 6">
        {/* logo and user */}
        <div className="mb-5">
          <div className="w-full flex justify-between items-center">
            <Link className="w-9/12">
              <img
                className="h-[60px]"
                src="http://localhost:3000/images/logo.png"
                alt=""
              />
            </Link>
            {/* close button in sidebar */}
            <span
              onClick={() => setShowSidebar(!showSidebar)}
              className="text-2xl hover:bg-red-700 w-[30px] h-[30px] hover:text-white cursor-pointer flex justify-center rounded-full items-center"
            >
              <IoMdCloseCircle />
            </span>
          </div>
          <div className="flex flex-col w-9/12 justify-center items-center">
            {userInfo ? (
              <Link className="flex flex-col justify-center items-center  font-semibold">
                <span className="w-[30px] h-[30px] bg-slate-200 flex justify-center items-center rounded-full hover:bg-slate-400">
                  <FaUser />
                </span>
                <span>{userInfo.name}</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className=" flex flex-col justify-center items-center "
              >
                <span className="w-[30px] h-[30px] bg-slate-200 rounded-full hover:bg-slate-400 flex justify-center items-center">
                  <FaLock />
                </span>
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
        {/* navigation bar */}
        <div className="">
          <ul className="flex flex-col justify-start gap-3 font-bold">
            <li
              className={`cursor-pointer px-3 py-2 rounded-md ${
                pathname === "/" ? "bg-blue-700 text-white" : ""
              } `}
            >
              <Link to="/">Home</Link>
            </li>
            <li
              className={`cursor-pointer px-3 py-2 rounded-md ${
                pathname === "/shops" ? "bg-blue-700 text-white" : ""
              } `}
            >
              <Link to="/shops">Shop</Link>
            </li>
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
        {/* social media */}
        <div>
          <div className="flex  w-full justify-between items-center h-[50px] mt-9 px-3">
            <ul className="flex gap-7 justify-center items-center text-2xl">
              <li>
                <CiFacebook />
              </li>
              <li>
                <FaGithub />
              </li>
              <li>
                <FaInstagram />
              </li>
            </ul>
          </div>
        </div>
        {/* mobile */}
        <div className="flex justify-start items-center gap-2 mt-3 ">
          <span className="w-[30px] h-[30px] bg-slate-200 rounded-full flex items-center justify-center">
            <IoIosCall />
          </span>
          <span>(+91)96654543354</span>
        </div>
        {/* Email  */}
        <div className="flex justify-start items-center gap-2 mt-3 ">
          <span className="w-[30px] h-[30px] bg-slate-200 rounded-full flex items-center justify-center">
            <MdOutlineMarkEmailRead />
          </span>
          <span>support@gmail.com</span>
        </div>
      </div>
    </div>
  );
};

export default HeaderSidebar;

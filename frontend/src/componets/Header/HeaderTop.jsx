import React from "react";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { FaUser, FaLock, FaGithub, FaInstagram } from "react-icons/fa";
import { FaMobileScreen } from "react-icons/fa6";
import { CiFacebook } from "react-icons/ci";
import { Link } from "react-router-dom";

const HeaderTop = ({ userInfo }) => (
  <div className="w-[85%] lg:w-[90%] mx-auto flex">
    <div className="flex w-full justify-between items-center h-[50px]">
      <ul className="flex justify-center gap-8 font-semibold after:absolute after:h-[18px] after:w-[1px] after:bg-slate-500">
        <li className="flex flex-row justify-center items-center gap-2 text-sm">
          <MdOutlineMarkEmailRead />
          <span>support@gmail.com</span>
        </li>
        <li className="flex relative justify-center items-center gap-2 text-sm">
          <FaMobileScreen />
          <span>(+91)96654543354</span>
        </li>
      </ul>
    </div>
    <div className="flex gap-8 items-center">
      <div className="flex w-full justify-between items-center h-[50px]">
        <ul className="flex gap-4 justify-center items-center text-md">
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
      <div className="flex flex-row w-[150px]">
        {userInfo ? (
          <Link
            to="/dashboard"
            className="flex flex-row justify-end items-center gap-2 font-semibold"
          >
            <FaUser />
            <span className="overflow-hidden w-[130px]">{userInfo.name}</span>
          </Link>
        ) : (
          <Link
            to="/login"
            className="flex flex-row justify-center items-center gap-2 font-semibold"
          >
            <FaLock />
            <span>Login</span>
          </Link>
        )}
      </div>
    </div>
  </div>
);

export default HeaderTop;

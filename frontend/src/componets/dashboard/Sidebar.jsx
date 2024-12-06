import React from "react";
import { IoIosHome } from "react-icons/io";
import { FaBorderAll } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import { IoPersonCircle } from "react-icons/io5";

const Sidebar = ({ filterShow }) => {
  return (
    <div>
      <div
        className={`rounded-md z-50 md-lg:absolute ${
          filterShow ? "-left-4" : "-left-[360px]"
        } w-[270px] ml-4 bg-white`}
      >
        <ul className="py-2 text-slate-600 px-4">
          <li className="flex justify-start items-center gap-2 py-2">
            <span className="text-xl">
              <IoIosHome />
            </span>
            <Link to="/dashboard" className="block">
              Dashboard
            </Link>
          </li>
          <li className="flex justify-start items-center gap-2 py-2">
            <span className="text-xl">
              <FaBorderAll />
            </span>
            <Link to="/dashboard/my-orders" className="block">
              My Orders
            </Link>
          </li>
          <li className="flex justify-start items-center gap-2 py-2">
            <span className="text-xl">
              <FaHeart />
            </span>
            <Link to="/dashboard" className="block">
              Wishlist
            </Link>
          </li>
          <li className="flex justify-start items-center gap-2 py-2">
            <span className="text-xl">
              <IoChatbubbleEllipsesSharp />
            </span>
            <Link to="/dashboard" className="block">
              Chat
            </Link>
          </li>
          <li className="flex justify-start items-center gap-2 py-2">
            <span className="text-xl">
              <IoPersonCircle />
            </span>
            <Link to="/dashboard" className="block">
              Profile
            </Link>
          </li>

          <li className="flex justify-start items-center gap-2 py-2">
            <span className="text-xl">
              <IoMdLogOut />
            </span>
            <Link to="/dashboard" className="block">
              Logout{" "}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

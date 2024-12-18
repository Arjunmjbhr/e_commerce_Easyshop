import React from "react";
import { IoIosHome } from "react-icons/io";
import { FaBorderAll } from "react-icons/fa"; // Correct import
import { FaHeart } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import { IoPersonCircle } from "react-icons/io5";
import { GiWallet } from "react-icons/gi";
import { useLocation } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";

const Sidebar = ({ filterShow, logout }) => {
  const { pathname } = useLocation();
  const normalizedPath = pathname.replace(/\/$/, "");
  const navigation = [
    {
      name: "Dashboard",
      icons: <IoIosHome />,
      path: "/dashboard",
    },
    {
      name: "My Orders",
      icons: <FaBorderAll />,
      path: "/dashboard/my-orders",
    },
    {
      name: "Wishlist",
      icons: <FaHeart />,
      path: "/dashboard/wishlist",
    },
    {
      name: "Cart",
      icons: <FaCartArrowDown />,
      path: "/cart",
    },
    {
      name: "Wallet",
      icons: <GiWallet />,
      path: "/dashboard/wallet",
    },
    {
      name: "Chat",
      icons: <IoChatbubbleEllipsesSharp />,
      path: "/dashboard/chat",
    },
    {
      name: "Profile",
      icons: <IoPersonCircle />,
      path: "/dashboard/user-profile",
    },
  ];

  return (
    <div>
      <div
        className={`rounded-md z-50 md-lg:absolute ${
          filterShow ? "-left-4" : "-left-[360px]"
        } w-[270px] ml-4 bg-white shadow-md`}
      >
        <div className="py-3 text-slate-600 px-6 flex flex-col gap-4 ">
          {navigation.map((nav) => (
            <Link to={nav.path} key={nav.name} className="block">
              <div
                className={`${
                  normalizedPath === nav.path ? "bg-green-300" : ""
                } flex justify-start items-center gap-2 py-2 shadow-sm hover:bg-slate-300 rounded-md px-3`}
              >
                <span className="text-xl">{nav.icons}</span>
                <span>{nav.name}</span>
              </div>
            </Link>
          ))}
        </div>
        <div
          onClick={logout}
          className="flex justify-start items-center px-9 gap-2 py-2 cursor-pointer shadow-sm hover:bg-red-500 hover:text-white rounded-md "
        >
          <span className="text-xl">
            <IoMdLogOut />
          </span>
          <div className="block">Logout</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

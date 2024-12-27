import { MdOutlineDashboardCustomize } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaUserTimes, FaUsers } from "react-icons/fa";
import { FaCodePullRequest } from "react-icons/fa6";
import { IoIosChatbubbles } from "react-icons/io";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { MdAddBox } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { BiSolidOffer } from "react-icons/bi";
import { IoIosPricetags } from "react-icons/io";
import { FaLayerGroup } from "react-icons/fa6";
import { RiCoupon2Fill } from "react-icons/ri";
import { CgPerformance } from "react-icons/cg";

export const allNav = [
  // admin navigation
  {
    id: 1,
    title: "Dashboard",
    icon: <MdOutlineDashboardCustomize />,
    role: "admin",
    path: "/admin/dashboard",
  },
  {
    id: 2,
    title: "Sales",
    icon: <IoIosPricetags />,
    role: "admin",
    path: "/admin/sales",
  },
  {
    id: 3,
    title: "Top Performence",
    icon: <CgPerformance />,
    role: "admin",
    path: "/admin/dashboard/best",
  },
  {
    id: 4,
    title: "Orders",
    icon: <AiOutlineShoppingCart />,
    role: "admin",
    path: "/admin/dashboard/orders",
  },
  {
    id: 5,
    title: "Category",
    icon: <FaLayerGroup />,
    role: "admin",
    path: "/admin/dashboard/category",
  },
  {
    id: 6,
    title: "Coupon",
    icon: <RiCoupon2Fill />,
    role: "admin",
    path: "/admin/dashboard/coupon",
  },
  {
    id: 7,
    title: "Offer",
    icon: <BiSolidOffer />,
    role: "admin",
    path: "/admin/dashboard/offer-category",
  },
  {
    id: 8,
    title: "Sellers",
    icon: <FaUsers />,
    role: "admin",
    path: "/admin/dashboard/sellers",
  },

  {
    id: 9,
    title: "Customers",
    icon: <FaUserTimes />,
    role: "admin",
    path: "/admin/dashboard/customers",
  },

  // seller navigation
  {
    id: 1,
    title: "Dashboard",
    icon: <MdOutlineDashboardCustomize />,
    role: "seller",
    path: "/seller/dashboard",
  },
  {
    id: 2,
    title: "All Product",
    icon: <MdOutlineProductionQuantityLimits />,
    role: "seller",
    path: "/seller/dashboard/all-product",
  },
  {
    id: 3,
    title: "Add Product",
    icon: <MdAddBox />,
    role: "seller",
    path: "/seller/dashboard/add-product",
  },
  {
    id: 5,
    title: "Orders",
    icon: <FaCartArrowDown />,
    role: "seller",
    path: "/seller/dashboard/orders",
  },
  {
    id: 6,
    title: "Add Blog",
    icon: <MdOutlinePayment />,
    role: "seller",
    path: "/seller/dashboard/blog",
  },

  {
    id: 7,
    title: "Chat Customer",
    icon: <IoChatbubbleEllipsesSharp />,
    role: "seller",
    path: "/seller/dashboard/chat-customer/:id",
  },

  {
    id: 9,
    title: "Profile",
    icon: <CgProfile />,
    role: "seller",
    path: "/seller/dashboard/profile",
  },
];

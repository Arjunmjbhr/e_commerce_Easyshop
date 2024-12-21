import { lazy } from "react";

const AdminDashboard = lazy(() => import("../../views/admin/AdminDashboard"));
const Orders = lazy(() => import("./../../views/admin/Orders"));
const Category = lazy(() => import("./../../views/admin/Category"));
const Sellers = lazy(() => import("./../../views/admin/Sellers"));
const SellerDetails = lazy(() => import("./../../views/admin/SellerDetails"));
const Customers = lazy(() => import("../../views/admin/Customers"));
const OrderDetails = lazy(() => import("../../views/admin/OrderDetails"));
const Coupon = lazy(() => import("./../../views/admin/Coupon"));
const OfferCategory = lazy(() => import("../../views/admin/OfferCategory"));
const Sales = lazy(() => import("../../views/admin/Sales"));
const Best = lazy(() => import("../../views/admin/Best"));

export const adminRoutes = [
  {
    path: "admin/dashboard",
    element: <AdminDashboard />,
    role: "admin",
  },
  {
    path: "admin/sales",
    element: <Sales />,
    role: "admin",
  },
  {
    path: "/admin/dashboard/orders",
    element: <Orders />,
    role: "admin",
  },
  {
    path: "/admin/dashboard/category",
    element: <Category />,
    role: "admin",
  },
  {
    path: "/admin/dashboard/sellers",
    element: <Sellers />,
    role: "admin",
  },
  {
    path: "/admin/dashboard/customers",
    element: <Customers />,
    role: "admin",
  },
  {
    path: "/admin/dashboard/coupon",
    element: <Coupon />,
    role: "admin",
  },
  {
    path: "/admin/dashboard/sellers/details/:sellerId",
    element: <SellerDetails />,
    role: "admin",
  },
  {
    path: "/admin/dashboard/order/details/:orderId",
    element: <OrderDetails />,
    role: "admin",
  },
  {
    path: "/admin/dashboard/offer-category",
    element: <OfferCategory />,
    role: "admin",
  },
  {
    path: "/admin/dashboard/best",
    element: <Best />,
    role: "admin",
  },
];

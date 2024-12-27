import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shops from "./pages/Shops";
import Details from "./pages/Details";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { get_categories } from "./store/reducers/homeReducer";
import Shipping from "./pages/Shipping";
import FilterRating from "./componets/shops/FilterRating";
import CategoryShop from "./pages/CategoryShop";
import SearchProducts from "./pages/SearchProducts";
import Payment from "./pages/Payment";
import Dashboard from "./pages/Dashboard";
import ProtectUser from "./utils/ProtectUser";
import Index from "./componets/dashboard/Index";
import OrderDashboard from "./componets/dashboard/OrderDashboard";
import OrderDetails from "./componets/dashboard/OrderDetails";
import UserProfile from "./pages/UserProfile";
import ResetPassword from "./componets/login_register/ResetPassword";
import Wishlist from "./pages/Wishlist";
import Wallet from "./componets/wallet/Wallet";
import ContactUs from "./pages/ContactUs";
import BlogPage from "./pages/BlogPage";

function App() {
  // for category details for header
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_categories());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shops" element={<Shops />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/product/details/:slug" element={<Details />} />
        <Route path="/products?" element={<CategoryShop />} />
        <Route path="/products/search?" element={<SearchProducts />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/test" element={<FilterRating />} />
        <Route
          path="/customer/reset-password/:userId/:token"
          element={<ResetPassword />}
        />
        {/* protected routes for the sing in customers */}

        <Route path="/dashboard" element={<ProtectUser />}>
          <Route path="" element={<Dashboard />}>
            <Route path="" element={<Index />} />
            <Route path="order/details/:orderId" element={<OrderDetails />} />
            <Route path="my-orders" element={<OrderDashboard />} />
            <Route path="user-profile" element={<UserProfile />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="wallet" element={<Wallet />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

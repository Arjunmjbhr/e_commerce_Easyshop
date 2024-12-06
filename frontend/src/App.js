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

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_categories());
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shops" element={<Shops />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/product/details/:slug" element={<Details />} />
        <Route path="/products?" element={<CategoryShop />} />
        <Route path="/products/search?" element={<SearchProducts />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/test" element={<FilterRating />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

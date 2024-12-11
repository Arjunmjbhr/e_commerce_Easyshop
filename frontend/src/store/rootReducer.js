import authUserReducer from "./reducers/authUserReducer";
import cartReducer from "./reducers/cartReducer";
import dashboardReducer from "./reducers/dashboardReducer";
import homeReducer from "./reducers/homeReducer";
import orderReducer from "./reducers/orderReducer";
import wishlistReducer from "./reducers/wishlistReducer";
const rootReducer = {
  home: homeReducer,
  authUser: authUserReducer,
  cart: cartReducer,
  order: orderReducer,
  dashboard: dashboardReducer,
  wishlist: wishlistReducer,
};
export default rootReducer;

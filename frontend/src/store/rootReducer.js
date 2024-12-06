import authUserReducer from "./reducers/authUserReducer";
import cartReducer from "./reducers/cartReducer";
import homeReducer from "./reducers/homeReducer";
import orderReducer from "./reducers/orderReducer";
const rootReducer = {
  home: homeReducer,
  authUser: authUserReducer,
  cart: cartReducer,
  order: orderReducer,
};
export default rootReducer;

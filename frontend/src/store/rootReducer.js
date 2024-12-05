import authUserReducer from "./reducers/authUserReducer";
import cartReducer from "./reducers/cartReducer";
import homeReducer from "./reducers/homeReducer";
const rootReducer = {
  home: homeReducer,
  authUser: authUserReducer,
  cart: cartReducer,
};
export default rootReducer;

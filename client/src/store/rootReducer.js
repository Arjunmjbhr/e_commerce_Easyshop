import authReducer from "./Reducers/authReducer";
import categoryReducer from "./Reducers/categoryReducer";
import productReducer from "./Reducers/productReducer";
import customerAdminReducer from "./Reducers/customerAdminReducer";
import orderReducer from "./Reducers/orderReducer";
import couponReducer from "./Reducers/couponReducer";

const rootReducer = {
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  customer: customerAdminReducer,
  order: orderReducer,
  coupon: couponReducer,
};

export default rootReducer;

import authReducer from "./Reducers/authReducer";
import categoryReducer from "./Reducers/categoryReducer";
import productReducer from "./Reducers/productReducer";
import customerAdminReducer from "./Reducers/customerAdminReducer";
import orderReducer from "./Reducers/orderReducer";
import couponReducer from "./Reducers/couponReducer";
import dashboardReducer from "./Reducers/dashboardReducer";
import sellerReducer from "./Reducers/sellerReducer";

const rootReducer = {
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  customer: customerAdminReducer,
  order: orderReducer,
  coupon: couponReducer,
  dashboard: dashboardReducer,
  seller: sellerReducer,
};

export default rootReducer;

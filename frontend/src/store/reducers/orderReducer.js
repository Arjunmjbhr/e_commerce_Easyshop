import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const place_order = createAsyncThunk(
  "order/place_order",
  async (
    { price, products, shipping_fee, items, shippingInfo, userId, navigate },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const { data } = await api.post("/home/order/place-order", {
        price,
        products,
        shipping_fee,
        items,
        shippingInfo,
        userId,
      });
      navigate("/payment", {
        state: {
          price: price + shipping_fee,
          items,
          orderId: data.orderId,
        },
      });

      return fulfillWithValue(data);
    } catch (error) {
      navigate("/cart");
      console.log(error.response);

      return rejectWithValue(error.response.data);
    }
  }
);
// End Method
export const cod_payment = createAsyncThunk(
  "order/cod_payment",
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/home/customer/cod-payment/${orderId}`);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End Method

export const verify_razorpay_payment = createAsyncThunk(
  "order/verify_razorpay_payment",
  async (
    { info, orderId, navigate },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.patch(
        `/home/product/verify-razorpay-payment/${orderId}`,
        info,
        { withCredentials: true }
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/////////////////Dashboard/////////////////

export const get_orders = createAsyncThunk(
  "order/get_orders",
  async ({ customerId, status }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/customer/get-orders/${customerId}/${status}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End Method
export const get_order_details = createAsyncThunk(
  "order/get_order_details",
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/customer/get-order-details/${orderId}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End Method
export const cancel_order = createAsyncThunk(
  "order/cancel_order",

  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    console.log(orderId);
    try {
      const { data } = await api.put(`/home/customer/cancel-order/${orderId}`);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End Method
export const return_product = createAsyncThunk(
  "order/return-product",

  async ({ orderId, productId }, { rejectWithValue, fulfillWithValue }) => {
    console.log(orderId);
    console.log(productId);
    try {
      const { data } = await api.put(
        `/home/customer/return-product/${orderId}/${productId}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End Method
export const customer_review = createAsyncThunk(
  "dashboard/customer_review",
  async (info, { fulfillWithValue }) => {
    try {
      console.log(info);
      const { data } = await api.post("/home/customer/submit-review", info);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.respone);
    }
  }
);
// End Method

/////////////applay coupon////////////////////

export const apply_coupon = createAsyncThunk(
  "order/apply_coupon",
  async ({ info, userId }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(
        `/home/product/apply-coupon/${userId}`,
        info,
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const remove_apply_coupon = createAsyncThunk(
  "order/remove_apply_coupon",
  async ({ info, userId }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(
        `/home/product/remove-apply-coupon/${userId}`,
        info,
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const orderReducer = createSlice({
  name: "order",
  initialState: {
    myOrders: [],
    errorMessage: "",
    isLoading: "",
    successMessage: "",
    placeOrderErrorMessage: "",
    myOrder: {},
    razorpayOrder: {},
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    placeOrderErrorMessageClear: (state, action) => {
      state.placeOrderErrorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_orders.fulfilled, (state, action) => {
        state.myOrders = action.payload.orders;
      })
      .addCase(get_order_details.fulfilled, (state, action) => {
        state.myOrder = action.payload.order;
      })
      .addCase(cancel_order.fulfilled, (state, action) => {
        state.successMessage = action.payload.message;
      })
      .addCase(cancel_order.rejected, (state, action) => {
        state.errorMessage = action.payload.error;
      })
      .addCase(cod_payment.fulfilled, (state, action) => {
        state.successMessage = action.payload.message;
      })
      .addCase(cod_payment.rejected, (state, action) => {
        state.errorMessage = action.payload.error;
      })
      .addCase(apply_coupon.rejected, (state, action) => {
        state.errorMessage = action.payload.error;
      })
      .addCase(apply_coupon.fulfilled, (state, action) => {
        state.successMessage = action.payload.message;
      })
      .addCase(remove_apply_coupon.rejected, (state, action) => {
        state.errorMessage = action.payload.error;
      })
      .addCase(remove_apply_coupon.fulfilled, (state, action) => {
        state.successMessage = action.payload.message;
      })
      .addCase(place_order.fulfilled, (state, action) => {
        state.successMessage = action.payload.message;
      })
      .addCase(place_order.rejected, (state, action) => {
        state.placeOrderErrorMessage = action.payload.error;
      })
      .addCase(return_product.fulfilled, (state, action) => {
        state.successMessage = action.payload.message;
      })
      .addCase(return_product.rejected, (state, action) => {
        state.placeOrderErrorMessage = action.payload.error;
      })
      .addCase(verify_razorpay_payment.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(verify_razorpay_payment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(verify_razorpay_payment.rejected, (state, action) => {
        state.errorMessage = action.payload.error;
        state.isLoading = false;
      })
      .addCase(customer_review.fulfilled, (state, action) => {
        state.successMessage = action.payload.message;
      })
      .addCase(customer_review.rejected, (state, action) => {
        state.errorMessage = action.payload.error;
      });
  },
});
export const { messageClear, placeOrderErrorMessageClear } =
  orderReducer.actions;
export default orderReducer.reducer;

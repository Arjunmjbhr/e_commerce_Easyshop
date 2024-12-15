import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

///////////////// admin//////////////////////

export const get_admin_orders = createAsyncThunk(
  "order/get_admin_orders",
  async (
    { perPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      console.log(`${perPage} ${page} ${searchValue}`);
      const { data } = await api.get(
        `/admin/orders?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`,
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End Method
export const get_admin_specific_order = createAsyncThunk(
  "order/get_admin_specific_order",
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/specific-order/${orderId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End Method
export const admin_order_status_update = createAsyncThunk(
  "order/admin_order_status_update",
  async ({ orderId, info }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(
        `/admin/order-status/update/${orderId}`,
        info,
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End Method
export const admin_return_request_decision = createAsyncThunk(
  "order/admin_return_request_decision",
  async (
    { orderId, productId, info },
    { rejectWithValue, fulfillWithValue }
  ) => {
    console.log(orderId);
    console.log(productId);
    console.log(info);
    try {
      const { data } = await api.put(
        `/admin/return-request-decision/update/${orderId}/${productId}`,
        info,
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End Method

//////////////////////seller//////////////////////

export const get_seller_orders = createAsyncThunk(
  "order/get_seller_orders",
  async (
    { perPage, page, searchValue, sellerId },
    { rejectWithValue, fulfillWithValue }
  ) => {
    console.log(`${perPage} ${page} ${searchValue} ${sellerId}`);
    try {
      const { data } = await api.get(
        `/seller/orders/${sellerId}?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`,
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End Method
export const get_seller_specific_order = createAsyncThunk(
  "order/get_seller_specific_order",
  async ({ adminOrderId, sellerId }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/seller/specific-order/${adminOrderId}/${sellerId}`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End Method
export const seller_order_status_update = createAsyncThunk(
  "order/seller_order_status_update",
  async ({ adminOrderId, info }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(
        `/seller/order-status/update/${adminOrderId}`,
        info,
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End Method

const orderReducer = createSlice({
  name: "order",
  initialState: {
    successMessage: "",
    errorMessage: "",
    totalOrder: 0,
    order: {},
    myOrders: [],
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_admin_orders.fulfilled, (state, { payload }) => {
        state.myOrders = payload.orders;
        state.totalOrder = payload.totalOrder;
      })
      .addCase(get_admin_specific_order.fulfilled, (state, { payload }) => {
        state.order = payload.order;
      })
      .addCase(get_admin_specific_order.rejected, (state, { payload }) => {
        state.errorMessage = payload.errorMessage;
      })
      .addCase(admin_order_status_update.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
      })
      .addCase(admin_order_status_update.rejected, (state, { payload }) => {
        state.errorMessage = payload.message;
      })
      .addCase(get_seller_orders.fulfilled, (state, { payload }) => {
        state.myOrders = payload.orders;
        state.totalOrder = payload.totalOrder;
      })
      .addCase(get_seller_specific_order.fulfilled, (state, { payload }) => {
        state.order = payload.order;
      })
      .addCase(get_seller_specific_order.rejected, (state, { payload }) => {
        state.errorMessage = payload.errorMessage;
      })
      .addCase(seller_order_status_update.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
      })
      .addCase(seller_order_status_update.rejected, (state, { payload }) => {
        state.errorMessage = payload.message;
      })
      .addCase(
        admin_return_request_decision.fulfilled,
        (state, { payload }) => {
          state.successMessage = payload.message;
        }
      )
      .addCase(admin_return_request_decision.rejected, (state, { payload }) => {
        state.errorMessage = payload.message;
      });
  },
});
export const { messageClear } = orderReducer.actions;
export default orderReducer.reducer;

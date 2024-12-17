import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_admin_sales_data = createAsyncThunk(
  "dashboard/get_admin_sales_data",
  async (
    { page, beginDate, lastDate },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/admin/get-admin-sales-data?beginDate=${beginDate}&&lastDate=${lastDate}&&page=${page}`,
        {
          withCredentials: true,
        }
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const dashboardReducer = createSlice({
  name: "dashboard",
  initialState: {
    salesOrders: [],
    errorMessage: "",
    successMessage: "",
    totalOrder: 0,
    totalProductSold: 0,
    totalProductReturn: 0,
    pendingOrder: 0,
    totalSalesRevenue: 0,
    totalAdminRevenue: 0,
    couponUsedCount: 0,
    couponUsedAmount: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(get_admin_sales_data.fulfilled, (state, action) => {
      state.salesOrders = action.payload.salesOrders;
      state.totalOrder = action.payload.totalOrder;
      state.totalProductSold = action.payload.totalProductSold;
      state.totalProductReturn = action.payload.totalProductReturn;
      state.pendingOrder = action.payload.pendingOrder;
      state.totalSalesRevenue = action.payload.totalSalesRevenue;
      state.couponUsedCount = action.payload.couponUsedCount;
      state.couponUsedAmount = action.payload.couponUsedAmount;
      state.totalAdminRevenue = action.payload.totalAdminRevenue;
      state.successMessage = action.payload.successMessage;
      state.errorMessage = action.payload.errorMessage;
    });
  },
});
export const { messageClear } = dashboardReducer.actions;
export default dashboardReducer.reducer;

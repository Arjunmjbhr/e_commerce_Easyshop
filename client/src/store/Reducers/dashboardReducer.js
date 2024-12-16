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
    totalProductSale: "",
    totalOrder: "",
    totalRevenueToSellers: "",
    totalRevenueToAdmin: "",
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
    });
  },
});
export const { messageClear } = dashboardReducer.actions;
export default dashboardReducer.reducer;

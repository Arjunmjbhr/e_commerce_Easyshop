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
export const get_admin_dashboard_data = createAsyncThunk(
  "dashboard/get_admin_dashboard_data",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/get-admin-dashboard-data`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
export const get_admin_dashboard_chart = createAsyncThunk(
  "dashboard/get_admin_dashboard_chart",
  async ({ info }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/admin/get-admin-dashboard-chart/${info}`,
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
export const get_seller_dashboard_data = createAsyncThunk(
  "dashboard/get_seller_dashboard_data",
  async ({ sellerId }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/admin/get-seller-dashboard-data/${sellerId}`,
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
export const get_top_data = createAsyncThunk(
  "dashboard/get_top_data",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/get-top-data`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
export const post_blog = createAsyncThunk(
  "dashboard/post_blog",
  async (blogData, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/seller/post-blog`, blogData, {
        withCredentials: true,
      });

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
    allSalesRevenue: 0,
    allOrders: 0,
    allProducts: 0,
    allSellers: 0,
    chartRevenue: [],
    chartOrders: [],
    sellerTotalOrder: 0,
    sellerTotalProduct: 0,
    sellerTotalSales: 0,
    sellerPendingOrder: 0,
    topSeller: [],
    topProduct: [],
    topBrand: [],
    topCategory: [],
    seller: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_admin_sales_data.fulfilled, (state, action) => {
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
      })
      .addCase(get_admin_dashboard_data.fulfilled, (state, action) => {
        state.allSalesRevenue = action.payload.allSalesRevenue;
        state.allOrders = action.payload.allOrders;
        state.allProducts = action.payload.allProducts;
        state.allSellers = action.payload.allSellers;
      })
      .addCase(get_seller_dashboard_data.fulfilled, (state, action) => {
        state.sellerTotalOrder = action.payload.sellerTotalOrder;
        state.sellerTotalProduct = action.payload.sellerTotalProduct;
        state.sellerTotalSales = action.payload.sellerTotalSales;
        state.sellerPendingOrder = action.payload.sellerPendingOrder;
        state.chartOrders = action.payload.chartOrders;
        state.chartRevenue = action.payload.chartRevenue;
      })
      .addCase(get_top_data.fulfilled, (state, action) => {
        state.topSeller = action.payload.topSeller;
        state.topProduct = action.payload.topProduct;
        state.topBrand = action.payload.topBrand;
        state.topCategory = action.payload.topCategory;
        state.seller = action.payload.seller;
      })
      .addCase(get_admin_dashboard_chart.fulfilled, (state, action) => {
        state.chartOrders = action.payload.chartOrders;
        state.chartRevenue = action.payload.chartRevenue;
      })
      .addCase(post_blog.fulfilled, (state, action) => {
        state.successMessage = action.payload.message;
      })
      .addCase(post_blog.rejected, (state, action) => {
        state.errorMessage = action.payload.error;
      });
  },
});
export const { messageClear } = dashboardReducer.actions;
export default dashboardReducer.reducer;

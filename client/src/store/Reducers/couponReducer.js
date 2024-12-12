import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./../../api/api";

export const add_coupon = createAsyncThunk(
  "coupon/add_coupon",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      console.log(info);
      const response = await api.post("/admin/add-coupon", info, {
        withCredentials: true,
      });
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_coupon = createAsyncThunk(
  "coupon/get_coupon",
  async (
    { perPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response = await api.get(
        `/admin/get-coupon?page=${page}&&perPage=${perPage}&&searchValue=${searchValue}`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const update_coupon = createAsyncThunk(
  "coupon/update_coupon",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await api.post(`/admin/update-coupon`, info, {
        withCredentials: true,
      });
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const delete_coupon = createAsyncThunk(
  "coupon/delete_coupon",
  async (couponId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await api.delete(`/admin/delete-coupon/${couponId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const couponReducer = createSlice({
  name: "category",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    coupons: [],
    totalCoupons: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(add_coupon.pending, (state, _) => {
        state.loader = true;
      })
      .addCase(add_coupon.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
      .addCase(add_coupon.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload?.message;
      })
      .addCase(get_coupon.fulfilled, (state, action) => {
        state.coupons = action.payload.coupons;
        state.totalCoupons = action.payload.totalCoupons;
      })
      .addCase(update_coupon.pending, (state, _) => {
        state.loader = true;
      })
      .addCase(update_coupon.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
      .addCase(update_coupon.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload?.message;
      })
      .addCase(delete_coupon.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
      .addCase(delete_coupon.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload?.message;
      });
  },
});

export default couponReducer.reducer;
export const { messageClear } = couponReducer.actions;

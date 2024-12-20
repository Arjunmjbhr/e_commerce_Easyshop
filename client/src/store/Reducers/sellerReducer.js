import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_seller_request = createAsyncThunk(
  "seller/get_seller_request",
  async (
    { perPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/admin/request-seller-get?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`,
        { withCredentials: true }
      );
      // console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);
// End Method
export const get_specific_seller_details = createAsyncThunk(
  "seller/get_specific_seller_details",
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/admin/get-specific-seller-details/${sellerId}`,
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End Method
export const update_seller_active_deactive = createAsyncThunk(
  "seller/update_seller_active_deactive",
  async ({ sellerId, info }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(
        `/admin/update-seller-active-deactive/${sellerId}`,
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

const sellerReducer = createSlice({
  name: "seller",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    sellers: [],
    totalSeller: 0,
    specificSeller: {},
  },
  reducers: {
    messageClear: (state, _) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_seller_request.fulfilled, (state, { payload }) => {
        state.sellers = payload.sellers;
        state.totalSeller = payload.totalSeller;
      })
      .addCase(get_specific_seller_details.fulfilled, (state, { payload }) => {
        state.sellers = payload.sellers;
        state.specificSeller = payload.specificSeller;
      })
      .addCase(
        update_seller_active_deactive.fulfilled,
        (state, { payload }) => {
          state.successMessage = payload.message;
        }
      )
      .addCase(update_seller_active_deactive.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
      });
  },
});
export const { messageClear } = sellerReducer.actions;
export default sellerReducer.reducer;

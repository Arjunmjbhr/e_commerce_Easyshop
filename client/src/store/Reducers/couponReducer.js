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

//

export const get_category = createAsyncThunk(
  "category/get_category",
  async (
    { perPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response = await api.get(
        `/category-get?page=${page}&&perPage=${perPage}&&searchValue=${searchValue}`,
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
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (
    { id, categoryName, image },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      console.log(image);
      const formData = new FormData();
      formData.append("categoryName", categoryName);
      if (image) {
        formData.append("image", image);
      }
      const response = await api.put(`category-update/${id}`, formData, {
        withCredentials: true,
      });

      console.log(response.data);
      return fulfillWithValue(response.data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      console.log(id);
      const token = localStorage.getItem("accessToken");
      if (!token) {
        return rejectWithValue({
          error: "Authentication token not found please login",
        });
      }
      const response = await api.put(
        `category-delete/${id}`,
        {
          isDeleted: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the Authorization header
          },
          withCredentials: true, // Keep this if you need cookies for cross-origin requests
        }
      );

      console.log("Soft Delete Response:", response.data);
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
      });
  },
});

export default couponReducer.reducer;
export const { messageClear } = couponReducer.actions;

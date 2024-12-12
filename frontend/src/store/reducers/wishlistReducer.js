import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// wishlist

export const add_to_wishlist = createAsyncThunk(
  "wishlist/add_to_wishlist",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      console.log(info);
      const { data } = await api.post("/home/product/add-to-wishlist", info);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_wishlist_products = createAsyncThunk(
  "wishlist/get_wishlist_product",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/product/get-wishlist-product/${userId}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const delete_wishlist_products = createAsyncThunk(
  "wishlist/delete_wishlist_product",
  async (wishlistId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(
        `/home/product/delete-wishlist-product/${wishlistId}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartReducer = createSlice({
  name: "wishlist",
  initialState: {
    wishlistErrorMessage: "",
    wishlistSuccessMessage: "",
    wishlist_count: 0,
    wishlist: [],
  },
  reducers: {
    messageClearWishlist: (state, _) => {
      state.wishlistErrorMessage = "";
      state.wishlistSuccessMessage = "";
    },
    reset_wishlist_count: (state, _) => {
      state.wishlist_count = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(add_to_wishlist.rejected, (state, action) => {
        state.wishlistErrorMessage = action.payload.error;
      })
      .addCase(add_to_wishlist.fulfilled, (state, action) => {
        state.wishlist_count = state.wishlist_count + 1;
        state.wishlistSuccessMessage = action.payload.message;
      })
      .addCase(get_wishlist_products.rejected, (state, action) => {
        state.wishlistErrorMessage = action.payload.error;
      })
      .addCase(get_wishlist_products.fulfilled, (state, action) => {
        state.wishlist_count = action.payload.wishlist_count;
        state.wishlist = action.payload.wishlist;
      })
      .addCase(delete_wishlist_products.rejected, (state, action) => {
        state.wishlistErrorMessage = action.payload.error;
        state.wishlist_count = state.wishlist_count - 1;
      })
      .addCase(delete_wishlist_products.fulfilled, (state, action) => {
        state.wishlist_count = state.wishlist_count + 1;
        state.wishlistSuccessMessage = action.payload.message;
      });
  },
});
export const { messageClearWishlist, reset_wishlist_count } =
  cartReducer.actions;
export default cartReducer.reducer;

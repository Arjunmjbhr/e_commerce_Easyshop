import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// cart

export const add_to_cart = createAsyncThunk(
  "cart/add_to_card",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/home/product/add-to-cart", info);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End Method
export const get_cart_products = createAsyncThunk(
  "cart/get_cart_product",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    console.log(userId);
    try {
      const { data } = await api.get(
        `/home/product/get-cart-product/${userId}`
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End Method
export const delete_cart_product = createAsyncThunk(
  "cart/delete_cart_product",
  async (cartId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(
        `/home/product/delete-cart-product/${cartId}`
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const quantity_increment = createAsyncThunk(
  "cart/quantity_increment",
  async (cartId, { rejectWithValue, fulfillWithValue }) => {
    try {
      console.log(cartId);
      const { data } = await api.put(`/home/product/quantity-inc/${cartId}`);
      // console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End Method
export const quantity_decrement = createAsyncThunk(
  "cart/quantity_decrement",
  async (cartId, { rejectWithValue, fulfillWithValue }) => {
    try {
      console.log(cartId);
      const { data } = await api.put(`/home/product/quantity-dec/${cartId}`);
      // console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End Method

//

const cartReducer = createSlice({
  name: "cart",
  initialState: {
    cart_products: [],
    cart_product_count: 0,
    price: 0,
    shipping_fee: 0,
    outofstock_products: [],
    buy_product_item: 0,
    errorMessage: "",
    successMessage: "",
    wishlist_count: 0,
    wishlist: [],
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    reset_count: (state, _) => {
      state.cart_product_count = 0;
      state.wishlist_count = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(add_to_cart.rejected, (state, action) => {
        state.errorMessage = action.payload.error;
      })
      .addCase(add_to_cart.fulfilled, (state, action) => {
        state.cart_product_count = state.cart_product_count + 1;
        state.successMessage = action.payload.message;
      })
      .addCase(get_cart_products.fulfilled, (state, action) => {
        state.cart_products = action.payload.cart_products;
        state.price = action.payload.price;
        state.cart_product_count = action.payload.cart_product_count;
        state.shipping_fee = action.payload.shipping_fee;
        state.outofstock_products = action.payload.outOfStockProduct;
        state.buy_product_item = action.payload.buy_product_item;
      })
      .addCase(quantity_increment.fulfilled, (state, action) => {
        state.successMessage = action.payload.message;
      })
      .addCase(delete_cart_product.fulfilled, (state, action) => {
        state.successMessage = action.payload.message;
      })
      .addCase(quantity_decrement.fulfilled, (state, action) => {
        state.successMessage = action.payload.message;
      });
  },
});
export const { messageClear, reset_count } = cartReducer.actions;
export default cartReducer.reducer;

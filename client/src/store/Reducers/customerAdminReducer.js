import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

//fetching the category
export const get_customer = createAsyncThunk(
  "customers/get_customers",
  async (
    { perPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response = await api.get(
        `admin/customer-get?page=${page}&&perPage=${perPage}&&searchValue=${searchValue}`,
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
// blocking and unblocking the  a customer
export const block_unblock_customer = createAsyncThunk(
  "customer/block_customer",
  async (customerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      console.log(customerId);
      const token = localStorage.getItem("accessToken");
      if (!token) {
        return rejectWithValue({
          error: "Authentication token not found please login",
        });
      }
      const response = await api.put(
        `admin/customer-block/${customerId}`,
        {
          isBlocked: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the Authorization header
          },
          withCredentials: true, // Keep this if you need cookies for cross-origin requests
        }
      );

      console.log("block Response:", response.data);
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const customerAdminReducer = createSlice({
  name: "customer",
  initialState: {
    loader: "",
    successMessage: "",
    errorMessage: "",
    customers: [],
    totalCustomers: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_customer.fulfilled, (state, action) => {
        state.customers = action.payload.customers;
        state.totalCustomers = action.payload.totalCustomers; // Fixed typo in `totalCustomers`
      })
      .addCase(block_unblock_customer.fulfilled, (state, action) => {
        state.successMessage = action.payload.message;
        state.customers = state.customers.map((cust) => {
          if (cust._id === action.payload.updatedCustomer._id) {
            return {
              ...cust,
              isBlocked: action.payload.updatedCustomer.isBlocked,
              blockedAt: action.payload.updatedCustomer.blockedAt,
            };
          }
          return cust;
        });
      })
      .addCase(block_unblock_customer.rejected, (state, action) => {
        state.errorMessage = action.payload.errorMessage;
      });
  },
});

export const { messageClear } = customerAdminReducer.actions;
export default customerAdminReducer.reducer;

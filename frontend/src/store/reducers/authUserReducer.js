import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";

// jwt decode for user information
const decodeToken = (token) => {
  if (token) {
    try {
      const decoded_userinfo = jwtDecode(token);
      return decoded_userinfo;
    } catch (error) {
      console.error("Invalid token", error);
      return null; // Return null if decoding fails
    }
  } else {
    return null; // Return null if no token is provided
  }
};
// api calls
export const customer_register = createAsyncThunk(
  "authUser/customer_register",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await api.post("/customer/customer-register", info);
      localStorage.setItem("customerToken", response.data.token);
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const customer_login = createAsyncThunk(
  "authUser/customer_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await api.post("/customer/customer-login", info);
      localStorage.setItem("customerToken", response.data.token);
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const googleLogin = createAsyncThunk(
  "authUser/googleLogin",
  async (googleData, { rejectWithValue }) => {
    console.log("this is google auth");

    try {
      const allData = decodeToken(googleData["credential"]);
      const userInfo = {
        name: allData?.name,
        email: allData?.email,
      };
      const response = await api.post("/auth/google", {
        userInfo,
      });
      localStorage.setItem("customerToken", response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Async thunk to send OTP to email
export const send_otp = createAsyncThunk(
  "auth/sendOtp",
  async (email, { fulfillWithValue, rejectWithValue }) => {
    try {
      console.log(email);
      const response = await api.post("customer/send-otp", {
        email,
      });
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Async thunk to verify OTP
export const verify_otp = createAsyncThunk(
  "customer/verify-otp",
  async (userData, { fulfillWithValue, rejectWithValue }) => {
    try {
      console.log(userData);
      const response = await api.post("customer/verify-otp", userData);
      localStorage.setItem("customerToken", response.data.token);
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// slice
export const authUserReducer = createSlice({
  name: "auth",
  initialState: {
    loader: false,
    userInfo: decodeToken(localStorage.getItem("customerToken")),
    errorMessage: "",
    successMessage: "",
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(customer_register.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(customer_register.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
        state.loader = false;
      })
      .addCase(customer_register.fulfilled, (state, { payload }) => {
        state.userInfo = decodeToken(payload.token);
        state.successMessage = payload.message;
        state.loader = false;
      })
      .addCase(customer_login.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(customer_login.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
        state.loader = false;
      })
      .addCase(customer_login.fulfilled, (state, { payload }) => {
        state.userInfo = decodeToken(payload.token);
        state.successMessage = payload.message;
        state.loader = false;
      })
      .addCase(googleLogin.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(googleLogin.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
        state.loader = false;
      })
      .addCase(googleLogin.fulfilled, (state, { payload }) => {
        state.userInfo = decodeToken(payload.token);
        state.successMessage = payload.message;
        state.loader = false;
      })
      .addCase(send_otp.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(send_otp.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
        state.loader = false;
      })
      .addCase(send_otp.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        state.loader = false;
      })
      .addCase(verify_otp.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(verify_otp.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
        state.loader = false;
      })
      .addCase(verify_otp.fulfilled, (state, { payload }) => {
        state.userInfo = decodeToken(payload.token);
        state.successMessage = payload.message;
        state.loader = false;
      });
  },
});

export const { messageClear } = authUserReducer.actions;
export default authUserReducer.reducer;

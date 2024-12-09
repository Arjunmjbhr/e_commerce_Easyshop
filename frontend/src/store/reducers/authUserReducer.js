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

//user profile edit
export const update_user_profile = createAsyncThunk(
  "authUser/update_user_profile",
  async ({ userId, info }, { rejectWithValue, fulfillWithValue }) => {
    try {
      console.log(info);
      const response = await api.put(
        `/customer/update-user-profile/${userId}`,
        info,
        { withCredentials: true }
      );
      localStorage.setItem("customerToken", response.data.token);
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_user_profile = createAsyncThunk(
  "authUser/get_user_profile",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await api.get(`/customer/get-user-profile/${userId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
); // End Method

// address management

export const add_address = createAsyncThunk(
  "authUser/add_address",
  async ({ userId, info }, { rejectWithValue, fulfillWithValue }) => {
    try {
      console.log(userId);
      console.log(info);
      const { data } = await api.post(
        `/home/customer/add_address/${userId}`,
        info,
        { withCredentials: true }
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End Method
export const update_address = createAsyncThunk(
  "authUser/update_address",
  async ({ addressId, info }, { rejectWithValue, fulfillWithValue }) => {
    try {
      console.log(info);
      const { data } = await api.post(
        `/home/customer/update_address/${addressId}`,
        info,
        { withCredentials: true }
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End Method
export const delete_address = createAsyncThunk(
  "authUser/delete_address",
  async (addressId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(
        `/home/customer/delete-address/${addressId}`,
        { withCredentials: true }
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End Method

// forgot-password

export const forgot_password = createAsyncThunk(
  "authUser/forgot_password",
  async (emailId, { rejectWithValue, fulfillWithValue }) => {
    try {
      console.log(emailId);
      const { data } = await api.post(`/customer/forgot-password`, { emailId });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End Method
export const reset_password = createAsyncThunk(
  "authUser/reset_password",
  async (
    { userId, token, password },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      console.log(userId);
      const { data } = await api.post(
        `/customer/reset-password/${userId}/${token}`,
        { password }
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End Method

// logout
export const logout_customer = createAsyncThunk(
  "authUser/logout",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/customer/logout`, {
        withCredentials: true,
      });
      localStorage.removeItem("customerToken");
      return fulfillWithValue(data);
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
    logoutMessage: "",
    userProfileInfo: {},
    addressUser: [],
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
      state.logoutMessage = "";
    },
    user_reset: (state, _) => {
      state.userInfo = "";
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
      })
      .addCase(update_user_profile.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(update_user_profile.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
        state.loader = false;
      })
      .addCase(update_user_profile.fulfilled, (state, { payload }) => {
        state.userInfo = decodeToken(payload.token);
        state.successMessage = payload.message;
        state.loader = false;
      })
      .addCase(get_user_profile.fulfilled, (state, { payload }) => {
        state.userProfileInfo = payload.userProfileInfo;
        state.addressUser = payload.addressUser;
      })
      .addCase(add_address.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(add_address.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
        state.loader = false;
      })
      .addCase(add_address.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        state.loader = false;
      })
      .addCase(update_address.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(update_address.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
        state.loader = false;
      })
      .addCase(update_address.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        state.loader = false;
      })
      .addCase(forgot_password.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
      })
      .addCase(forgot_password.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
      })
      .addCase(reset_password.pending, (state, { payload }) => {
        state.loader = false;
      })
      .addCase(reset_password.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
        state.loader = false;
      })
      .addCase(reset_password.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        state.loader = false;
      })
      .addCase(logout_customer.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
        state.loader = false;
      })
      .addCase(logout_customer.fulfilled, (state, { payload }) => {
        state.logoutMessage = payload.message;
        state.loader = false;
      })
      .addCase(delete_address.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
      })
      .addCase(delete_address.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
      });
  },
});

export const { messageClear, user_reset } = authUserReducer.actions;
export default authUserReducer.reducer;

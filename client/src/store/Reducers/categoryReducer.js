import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./../../api/api";

export const categoryAdd = createAsyncThunk(
  "category/categoryAdd",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      console.log(info);
      const formdata = new FormData();
      formdata.append("categoryName", info.categoryName);
      formdata.append("image", info.image);
      const response = await api.post("/category-add", formdata, {
        withCredentials: true,
      });
      console.log("the success message");
      console.log(response.data);
      return fulfillWithValue(response.data);
    } catch (error) {
      console.log("the error message");
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);
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

// offer category
export const add_category_offer = createAsyncThunk(
  "category/add_category_offer",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await api.post("/category/add-category-offer", info, {
        withCredentials: true,
      });
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const update_category_offer = createAsyncThunk(
  "category/update_category_offer",
  async ({ offerId, info }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await api.put(
        `/category/update-category-offer/${offerId}`,
        info,
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
export const get_category_offer = createAsyncThunk(
  "category/get_category_offer",
  async (
    { searchValue, perPage, page },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response = await api.get(
        `/category/get-category-offer?perpage=${perPage}&&searchValue=${searchValue}&&page=${page}`,
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
export const delete_category_offer = createAsyncThunk(
  "category/delete_category_offer",
  async (offerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await api.delete(
        `/category/delete-category-offer/${offerId}`,

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

const categoryReducer = createSlice({
  name: "category",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    categories: [],
    totalCategory: 0,
    categoryOffer: [],
    totalOffer: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(categoryAdd.pending, (state, _) => {
        state.loader = true;
      })
      .addCase(categoryAdd.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
      .addCase(categoryAdd.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload?.message;
        if (action.payload?.category) {
          state.categories.unshift(action.payload.category);
        }
      })
      .addCase(get_category.fulfilled, (state, action) => {
        state.totalCategory = action.payload.totalCategory;
        state.categories = action.payload.categories;
      })
      .addCase(updateCategory.pending, (state, _) => {
        state.loader = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        const index = state.categories.findIndex(
          (cat) => cat._id === action.payload.category._id
        );
        state.categories[index] = action.payload.category;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.categories = state.categories.filter(
          (cat) => cat._id !== action.meta.arg
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      })
      .addCase(add_category_offer.rejected, (state, action) => {
        state.errorMessage = action.payload?.error;
      })
      .addCase(add_category_offer.fulfilled, (state, action) => {
        state.successMessage = action.payload?.message;
      })
      .addCase(update_category_offer.rejected, (state, action) => {
        state.errorMessage = action.payload?.error;
      })
      .addCase(update_category_offer.fulfilled, (state, action) => {
        state.successMessage = action.payload?.message;
      })
      .addCase(get_category_offer.fulfilled, (state, action) => {
        state.categoryOffer = action.payload?.categoryOffer;
        state.totalOffer = action.payload.totalOffer;
      })
      .addCase(delete_category_offer.rejected, (state, action) => {
        state.errorMessage = action.payload?.error;
      })
      .addCase(delete_category_offer.fulfilled, (state, action) => {
        state.successMessage = action.payload?.message;
      });
  },
});

export default categoryReducer.reducer;
export const { messageClear } = categoryReducer.actions;

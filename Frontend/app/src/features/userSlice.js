import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const End_point = process.env.REACT_APP_API_ENDPOINT;

const initialState = {
  status: "idle",
  error: null,
  user: {
    id: "",
    name: "",
    email: "",
    picture: "",
    status: "",
    token: "",
  },
};

// Async thunk for registering user
export const registerUser = createAsyncThunk(
  "auth/register",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${End_point}/register`, { ...values });
      return data; // should contain { user, token, etc. }
    } catch (error) {
      return rejectWithValue(error.response?.data?.error?.message || "Something went wrong");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.status = "idle";
      state.error = null;
      state.user = {
        id: "",
        name: "",
        email: "",
        picture: "",
        status: "",
        token: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;

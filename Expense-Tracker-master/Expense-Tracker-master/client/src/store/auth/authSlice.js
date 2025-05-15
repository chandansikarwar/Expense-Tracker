import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/auth";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  token: localStorage.getItem("token") || null, // Store token
  otpSent: false, // ✅ New state for tracking OTP request
  otpLoading: false, // ✅ Loading state for OTP request
  otpError: null, // ✅ Error state for OTP request
  otpVerified: false, // ✅ New state for tracking OTP verification
  otpVerifyLoading: false, // ✅ Loading state for OTP verification
  otpVerifyError: null, // ✅ Error state for OTP verification
};

// Register User
export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const response = await axios.post(`${BASE_URL}/register`, formData, {
      withCredentials: true,
    });
    return response.data;
  }
);

export const generateOtp = createAsyncThunk(
  "/auth/gen-otp",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/request-otp`, formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to generate OTP");
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "/auth/verify-otp",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/verify-otp`, formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to verify OTP");
    }
  }
);

// Login User (Now includes OTP)
export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
  const response = await axios.post(`${BASE_URL}/login`, formData, {
    withCredentials: true,
  });

  if (response.data.success) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
});

// Logout User
export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
  localStorage.removeItem("token"); // Remove token on logout
  return null;
});

// Check Authentication
export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
  const response = await axios.get(`${BASE_URL}/check-auth`, {
    withCredentials: true,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    },
  });

  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
        state.token = action.payload.success ? action.payload.token : null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.token = null;
      })
      // ✅ Added cases for OTP generation
      .addCase(generateOtp.pending, (state) => {
        state.otpLoading = true;
        state.otpSent = false;
        state.otpError = null;
      })
      .addCase(generateOtp.fulfilled, (state) => {
        state.otpLoading = false;
        state.otpSent = true;
        state.otpError = null;
      })
      .addCase(generateOtp.rejected, (state, action) => {
        state.otpLoading = false;
        state.otpSent = false;
        state.otpError = action.payload;
      })
      // ✅ Added cases for OTP verification
      .addCase(verifyOtp.pending, (state) => {
        state.otpVerifyLoading = true;
        state.otpVerified = false;
        state.otpVerifyError = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.otpVerifyLoading = false;
        state.otpVerified = true;
        state.otpVerifyError = null;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.otpVerifyLoading = false;
        state.otpVerified = false;
        state.otpVerifyError = action.payload;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;

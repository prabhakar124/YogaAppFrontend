import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Types
export interface User {
  id: number;
  email: string;
  name?: string;
  role?: string;
  is_verified?: boolean;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean; // Track if we've checked for existing session
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  isInitialized: false,
};

// Base API URL
const API_URL = process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:4000/api';

// Helper function for API calls
const fetchWithCredentials = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || data.message || 'Request failed');
  }

  return data;
};

// Async Thunks
export const checkSession = createAsyncThunk(
  'auth/checkSession',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchWithCredentials(`${API_URL}/auth/me`);
      return data.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const signin = createAsyncThunk(
  'auth/signin',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const data = await fetchWithCredentials(`${API_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      return data.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (
    userData: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchWithCredentials(`${API_URL}/auth/register`, {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      return { email: data.email, message: data.message };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (verifyData: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const data = await fetchWithCredentials(`${API_URL}/auth/verify-email`, {
        method: 'POST',
        body: JSON.stringify(verifyData),
      });
      return data.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const resendVerificationOtp = createAsyncThunk(
  'auth/resendOtp',
  async (email: string, { rejectWithValue }) => {
    try {
      const data = await fetchWithCredentials(`${API_URL}/auth/resend-verification-otp`, {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      return data.message;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email: string, { rejectWithValue }) => {
    try {
      const data = await fetchWithCredentials(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      return data.message;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (
    resetData: { email: string; otp: string; newPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchWithCredentials(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        body: JSON.stringify({
          email: resetData.email,
          otp: resetData.otp,
          new_password: resetData.newPassword,
        }),
      });
      return data.message;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const signout = createAsyncThunk(
  'auth/signout',
  async (_, { rejectWithValue }) => {
    try {
      await fetchWithCredentials(`${API_URL}/auth/logout`, {
        method: 'POST',
      });
      return null;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    // Check Session
    builder
      .addCase(checkSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkSession.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isInitialized = true;
        state.error = null;
      })
      .addCase(checkSession.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.isInitialized = true;
        state.error = null; // Don't show error for missing session
      });

    // Sign In
    builder
      .addCase(signin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Sign Up
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Verify Email
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Resend OTP
    builder
      .addCase(resendVerificationOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendVerificationOtp.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resendVerificationOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Forgot Password
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Reset Password
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Sign Out
    builder
      .addCase(signout.pending, (state) => {
        state.loading = true;
      })
      .addCase(signout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(signout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        // Even if logout fails, clear user
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
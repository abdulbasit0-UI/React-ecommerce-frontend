// src/features/auth/authSlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, LoginDto, RegisterDto, User } from '../../types/auth';
import api from '../../lib/api';
import { toast } from 'sonner';
import { AxiosError } from 'axios';


interface LoginResponse {
  user: User;
  access_token: string;
}

interface MessageResponse {
  message: string;
}

interface ValidateTokenResponse {
  user: User;
}

/* ---------- Helpers ---------- */
function getInitialAuthState(): AuthState {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  
  // Don't validate token here - let the API call handle it
  // Just check if we have the basic auth data
  const isAuthenticated = Boolean(token && user);

  return {
    user,
    token,
    isAuthenticated,
    loginLoading: false,
    registerLoading: false,
    verifyEmailLoading: false,
    forgotPasswordLoading: false,
    resetPasswordLoading: false,
    validateTokenLoading: false,
    error: null,
  };
}



/* ---------- Async Thunks ---------- */

export const login = createAsyncThunk<
  LoginResponse,
  LoginDto,
  { rejectValue: string }
>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await api.post<LoginResponse>('/auth/login', credentials);
      return data;
    } catch (error) {
      const message = error instanceof AxiosError && error.response?.data?.message
        ? error.response.data.message
        : 'Login failed. Please check your credentials.';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const register = createAsyncThunk<
  MessageResponse,
  RegisterDto,
  { rejectValue: string }
>(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.post<MessageResponse>('/auth/register', userData);
      toast.success(data.message);
      return data;
    } catch (error) {
      const message = error instanceof AxiosError && error.response?.data?.message
        ? error.response.data.message
        : 'Registration failed. Please try again.';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const verifyEmail = createAsyncThunk<
  MessageResponse,
  string,
  { rejectValue: string }
>(
  'auth/verifyEmail',
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await api.get<MessageResponse>(`/auth/verify-email?token=${encodeURIComponent(token)}`);
      toast.success(data.message);
      return data;
    } catch (error) {
      const message = error instanceof AxiosError && error.response?.data?.message
        ? error.response.data.message
        : 'Email verification failed. Link may be expired.';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const forgotPassword = createAsyncThunk<
  MessageResponse,
  string,
  { rejectValue: string }
>(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await api.post<MessageResponse>('/auth/forgot-password', { email });
      toast.success(data.message);
      return data;
    } catch (error) {
      const message = error instanceof AxiosError && error.response?.data?.message
        ? error.response.data.message
        : 'Failed to send password reset email.';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const resetPassword = createAsyncThunk<
  MessageResponse,
  { newPassword: string; token: string },
  { rejectValue: string }
>(
  'auth/resetPassword',
  async ({ newPassword, token }, { rejectWithValue }) => {
    try {
      const { data } = await api.post<MessageResponse>('/auth/reset-password', { newPassword, token });
      toast.success(data.message);
      return data;
    } catch (error) {
      const message = error instanceof AxiosError && error.response?.data?.message
        ? error.response.data.message
        : 'Password reset failed. Link may be expired.';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const validateToken = createAsyncThunk<
  ValidateTokenResponse,
  void,
  { rejectValue: string }
>(
  'auth/validateToken',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get<ValidateTokenResponse>('/auth/me');
      return data;
    } catch (error) {
      // Check if it's a network error vs auth error
      if (error instanceof AxiosError) {
        if (error.code === 'NETWORK_ERROR' || (error.response?.status && error.response.status >= 500)) {
          // Don't clear auth on network/server errors
          return rejectWithValue('NETWORK_ERROR');
        }
        // Only clear on actual auth errors (401, 403, etc.)
        const message = error.response?.data?.message || 'Session expired. Please log in again.';
        return rejectWithValue(message);
      }
      
      return rejectWithValue('An unexpected error occurred during token validation');
    }
  } 
);

/* ---------- Slice ---------- */
const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialAuthState(),
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      toast.success('Logged out successfully');
    },
    clearAuthError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loginLoading = false;
        state.isAuthenticated = true;
        state.user = payload.user;
        state.token = payload.access_token;
        localStorage.setItem('token', payload.access_token);
        localStorage.setItem('user', JSON.stringify(payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.loginLoading = false;
        state.error = action.payload || 'Login failed';
      })

      // Register
      .addCase(register.pending, (state) => {
        state.registerLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.registerLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.registerLoading = false;
        state.error = action.payload || 'Registration failed';
      })

      // Verify Email
      .addCase(verifyEmail.pending, (state) => {
        state.verifyEmailLoading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.verifyEmailLoading = false;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.verifyEmailLoading = false;
        state.error = action.payload || 'Verification failed';
      })

      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.forgotPasswordLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.forgotPasswordLoading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.forgotPasswordLoading = false;
        state.error = action.payload || 'Failed to send reset email';
      })

      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.resetPasswordLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPasswordLoading = false;
        state.error = action.payload || 'Password reset failed';
      })

      // Validate Token (on app load)
      .addCase(validateToken.pending, (state) => {
        state.validateTokenLoading = true;
        state.error = null;
      })
      .addCase(validateToken.fulfilled, (state, { payload }) => {
        state.validateTokenLoading = false;
        state.isAuthenticated = true;
        state.user = payload.user;
      })
      .addCase(validateToken.rejected, (state) => {
        state.validateTokenLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      });
  },
});

export const { logout, clearAuthError, setUser } = authSlice.actions;
export default authSlice.reducer;
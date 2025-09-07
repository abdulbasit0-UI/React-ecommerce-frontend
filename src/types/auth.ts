// types/auth.ts
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'customer' | 'staff';
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  role?: 'customer' | 'admin' | 'staff';
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loginLoading: boolean;
  registerLoading: boolean;
  verifyEmailLoading: boolean;
  forgotPasswordLoading: boolean;
  resetPasswordLoading: boolean;
  validateTokenLoading: boolean;
  error: string | null;
}
export interface LoginRequest {
  email: string;
  password?: string;
}

export interface SignupRequest {
  email: string;
  password?: string;
  role?: 'TALENT' | 'EMPLOYER' | 'MENTOR';
}

export interface VerifyOTPRequest {
  email: string;
  code: string;
}

export interface User {
  id?: string;
  email?: string;
  role?: 'TALENT' | 'EMPLOYER' | 'MENTOR';
  firstName?: string;
  lastName?: string;
  [key: string]: any;
}

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface AuthData {
  accessToken: string;
  user: User;
}

export type AuthResponse = ApiResponse<AuthData>;


export interface GoogleLoginRequest {
  idToken: string;
}

export interface OAuthSelectRoleRequest {
  role: 'TALENT' | 'EMPLOYER' | 'MENTOR';
}

export interface OAuthVerifyEmailRequest {
  code: string;
}

export interface OAuthStatusResponse {
  isEmailVerified: boolean;
  hasRole: boolean;
  role?: 'TALENT' | 'EMPLOYER' | 'MENTOR';
  email?: string;
}


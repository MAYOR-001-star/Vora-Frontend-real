import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../api";
import { authKeys } from "./keys";
import type {
  LoginRequest,
  SignupRequest,
  VerifyOTPRequest,
  AuthResponse,
  User,
  GoogleLoginRequest,
  OAuthSelectRoleRequest,
  OAuthVerifyEmailRequest,
  OAuthStatusResponse,
  ApiResponse,
} from "./types";
import { useAuth } from "../../../context/AuthContext";
import { startTokenRefreshSchedule } from "../../api/scheduleRefreshToken";
import { toast } from "react-hot-toast";

export const useLoginMutation = () => {
  const { login } = useAuth();

  return useMutation({
    mutationKey: authKeys.login(),
    mutationFn: (data: LoginRequest) =>
      apiClient.post<AuthResponse>({
        url: "/auth/login",
        body: data,
        auth: false,
      }),
    onSuccess: (response) => {
      const authData = response.data;
      const user = authData.user;
      const mappedRole = ["talent", "mentor", "employer"].includes(
        user?.role?.toLowerCase() || "",
      )
        ? user.role!.toLowerCase()
        : "talent";

      login(
        {
          firstName: user?.firstName || "User",
          lastName: user?.lastName || "",
          role: mappedRole as any,
          email: user?.email,
        },
        authData.accessToken,
      );

      toast.success("Welcome back to VORA!");
      startTokenRefreshSchedule();
    },
  });
};

export const useSignupMutation = () => {
  return useMutation({
    mutationKey: authKeys.signup(),
    mutationFn: (data: SignupRequest) =>
      apiClient.post<ApiResponse<any>>({
        url: "/auth/register",
        body: data,
        auth: false,
      }),
    onSuccess: () => {
      toast.success("Registration successful! Please verify your email.");
    },
  });
};

export const useVerifyOTPMutation = () => {
  const { login } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: authKeys.verifyOTP(),
    mutationFn: (data: VerifyOTPRequest) =>
      apiClient.post<AuthResponse>({
        url: "/auth/verify-email",
        body: data,
        auth: false,
      }),
    onSuccess: (response) => {
      const authData = response.data;
      const user = authData.user;
      const mappedRole = ["talent", "mentor", "employer"].includes(
        user?.role?.toLowerCase() || "",
      )
        ? user.role!.toLowerCase()
        : "talent";

      login(
        {
          firstName: user?.firstName || "User",
          lastName: user?.lastName || "",
          role: mappedRole as any,
          email: user?.email,
        },
        authData.accessToken,
      );

      toast.success("Email verified successfully!");
      startTokenRefreshSchedule();
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
    },
  });
};

export const useGetCurrentUser = (options = {}) => {
  const { isAuthenticated, logout, updateUser } = useAuth();

  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: async () => {
      try {
        const response = await apiClient.get<ApiResponse<User>>({
          url: "/auth/me",
        });
        const user = response.data;
        updateUser({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        });
        return user;
      } catch (err: any) {
        if (err.status === 401) {
          logout();
        }
        throw err;
      }
    },
    enabled: isAuthenticated,
    retry: false,
    ...options,
  });
};

export const useGoogleLoginMutation = () => {
  const { login } = useAuth();

  return useMutation({
    mutationKey: authKeys.googleLogin(),
    mutationFn: (data: GoogleLoginRequest) =>
      apiClient.post<AuthResponse>({
        url: "/auth/google",
        body: data,
        auth: false,
      }),
    onSuccess: (response) => {
      const authData = response.data;
      const user = authData.user;
      const mappedRole = ["talent", "mentor", "employer"].includes(
        user?.role?.toLowerCase() || "",
      )
        ? user.role!.toLowerCase()
        : "talent";

      login(
        {
          firstName: user?.firstName || "User",
          lastName: user?.lastName || "",
          role: mappedRole as any,
          email: user?.email,
        },
        authData.accessToken,
      );

      toast.success("Welcome to VORA!");
      startTokenRefreshSchedule();
    },
  });
};

export const useOAuthSelectRoleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: authKeys.oauthSelectRole(),
    mutationFn: (data: OAuthSelectRoleRequest) =>
      apiClient.post<AuthResponse>({
        url: "/auth/oauth/select-role",
        body: data,
      }),
    onSuccess: () => {
      toast.success("Role configured successfully!");
      queryClient.invalidateQueries({ queryKey: authKeys.oauthStatus() });
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
    },
  });
};

export const useOAuthVerifyEmailMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: authKeys.oauthVerifyEmail(),
    mutationFn: (data: OAuthVerifyEmailRequest) =>
      apiClient.post<AuthResponse>({
        url: "/auth/oauth/verify-email",
        body: data,
      }),
    onSuccess: () => {
      toast.success("Email verified successfully!");
      queryClient.invalidateQueries({ queryKey: authKeys.oauthStatus() });
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
    },
  });
};

export const useOAuthResendOtpMutation = () => {
  return useMutation({
    mutationFn: () => apiClient.post({ url: "/auth/oauth/resend-email" }),
    onSuccess: () => {
      toast.success("Verification code resent successfully!");
    },
  });
};

export const useResendOTPMutation = () => {
  return useMutation({
    mutationFn: (data: { email: string }) =>
      apiClient.post({ url: "/auth/resend-verification", body: data, auth: false }),
    onSuccess: () => {
      toast.success("Verification code resent successfully!");
    },
  });
};

export const useGetOAuthStatus = (options = {}) => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: authKeys.oauthStatus(),
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<OAuthStatusResponse>>({
        url: "/auth/oauth/status",
      });
      return response.data;
    },
    enabled: isAuthenticated,
    ...options,
  });
};

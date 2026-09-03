import axiosInstance from "../api/axios";

export interface LoginRequest {
  empId: string;
  password: string;
}

export interface AuthUser {
  id: number;
  empId: string;
  name: string;
  email: string;
  roleId: number;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: AuthUser;
  };
}

export const login = async (payload: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>("/auth/login", payload);

  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");

  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/auth/me");

  return response.data;
};

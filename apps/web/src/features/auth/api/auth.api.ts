import apiClient from "@/shared/api/axios";
import type { ApiResponse } from "@/shared/api/types";
import type { LoginResponse } from "../model/auth.types";

// POST /auth/login - 이메일로 로그인
export const login = async (email: string): Promise<LoginResponse> => {
  const response = await apiClient.post<ApiResponse<LoginResponse>>(
    "/auth/login",
    null,
    { params: { email } },
  );
  return response.data.data;
};

// 로그인 요청 타입
export interface LoginRequest {
  email: string;
}

// 로그인 응답 타입
export interface LoginResponse {
  memberId: number;
  token: string;
}

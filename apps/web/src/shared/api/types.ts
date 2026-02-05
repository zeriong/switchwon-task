// API 응답 공통 타입
export interface ApiResponse<T> {
  code: string;
  message: string;
  data: T;
}

// API 에러 코드 타입
export type ApiErrorCode =
  | "OK"
  | "BAD_REQUEST"
  | "NOT_FOUND"
  | "UNAUTHORIZED"
  | "VALIDATION_ERROR"
  | "MISSING_PARAMETER"
  | "WALLET_INSUFFICIENT_BALANCE"
  | "EXCHANGE_RATE_MISMATCH"
  | "CURRENCY_MISMATCH";

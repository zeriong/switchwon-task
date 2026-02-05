// API 관련 설정
export const API_CONFIG = {
  // 환율 폴링 인터벌 (5초)
  EXCHANGE_RATE_POLL_INTERVAL: 5000,
  // 환율 데이터 stale 시간 (30초)
  EXCHANGE_RATE_STALE_TIME: 30000,
  // 환전 내역 stale 시간 (1분)
  ORDER_HISTORY_STALE_TIME: 60000,
  // 입력 디바운스 시간 (300ms)
  INPUT_DEBOUNCE_TIME: 300,
} as const;

// 페이지네이션 설정
export const PAGINATION_CONFIG = {
  // 페이지당 항목 수
  PAGE_SIZE: 10,
} as const;

// 인증 설정
export const AUTH_CONFIG = {
  // 토큰 만료 기간 (일)
  TOKEN_EXPIRY_DAYS: 1,
} as const;

// 날짜 포맷
export const DATE_FORMATS = {
  // 환전 내역 날짜 포맷
  HISTORY: "yyyy-MM-dd HH:mm:ss",
} as const;

// Toast 메시지 상수
export const TOAST_MESSAGES = {
  EXCHANGE: {
    LOADING_RATES: "환율 정보를 불러오는 중입니다.",
    SUCCESS: "환전이 완료되었습니다!",
    RATE_MISMATCH: "환율이 변동되었습니다. 다시 확인해주세요.",
    INSUFFICIENT_BALANCE: "잔액이 부족합니다.",
    FAILURE: "환전에 실패했습니다.",
  },
  AUTH: {
    LOGIN_SUCCESS: "로그인에 성공했습니다.",
    LOGIN_FAILURE: "로그인에 실패했습니다.",
  },
} as const;

// 에러 메시지 상수
export const ERROR_MESSAGES = {
  RATE_CHANGED: "환율이 변동되었습니다. 다시 확인해주세요.",
} as const;

// 빈 상태 메시지
export const EMPTY_MESSAGES = {
  NO_HISTORY: "환전 내역이 없습니다.",
  LOADING: "로딩 중...",
} as const;

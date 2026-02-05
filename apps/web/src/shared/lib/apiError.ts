/**
 * Axios 에러 응답에서 API 서버 에러 정보 추출
 *
 * Axios는 HTTP 에러 시 response 객체에 서버 응답을 첨부하는데,
 * 기본 Error 타입에는 이 정보가 없어 타입 단언으로 처리
 */
export function getApiError(error: Error): {
  code?: string;
  message?: string;
} {
  const err = error as Error & {
    response?: { data?: { code?: string; message?: string } };
  };
  return {
    code: err.response?.data?.code,
    message: err.response?.data?.message,
  };
}

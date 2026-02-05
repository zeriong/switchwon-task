import { CURRENCY_SYMBOLS } from "@/shared/constants/currencies";

/**
 * 통화 금액 포맷팅 (기호 + 천단위 구분자)
 * @example formatCurrency(1000, "USD") => "$ 1,000"
 */
export function formatCurrency(amount: number, currency: string): string {
  const symbol = CURRENCY_SYMBOLS[currency] || "";
  return `${symbol} ${amount.toLocaleString()}`;
}

/**
 * 원화 금액 포맷팅
 * @example formatKrwAmount(1000) => "1,000 원"
 */
export function formatKrwAmount(amount: number): string {
  return `${amount.toLocaleString()} 원`;
}

/**
 * 숫자를 천단위 구분자로 포맷팅 (소수점 유지)
 * @example formatNumberWithCommas("1234.56") => "1,234.56"
 */
export function formatNumberWithCommas(value: string): string {
  if (!value) return "";
  const num = Number(value);
  if (Number.isNaN(num)) return value;

  if (value.includes(".")) {
    const [integer, decimal] = value.split(".");
    return `${Number(integer).toLocaleString()}.${decimal}`;
  }
  return num.toLocaleString();
}

import usdSvg from "@/shared/assets/svg/usd.svg";
import jpySvg from "@/shared/assets/svg/jpy.svg";
import type { Currency } from "@/features/exchange/model/exchange.types";

// 통화별 기호
export const CURRENCY_SYMBOLS: Record<string, string> = {
  KRW: "₩",
  USD: "$",
  JPY: "¥",
};

// 통화별 정보 (아이콘, 이름)
export const CURRENCY_INFO: Record<Currency, { icon: string; name: string }> = {
  USD: { icon: usdSvg, name: "미국 달러" },
  JPY: { icon: jpySvg, name: "일본 엔화" },
};

// 통화 선택 옵션
export interface CurrencyOption {
  value: Currency;
  label: string;
  icon: string;
}

export const CURRENCY_OPTIONS: CurrencyOption[] = [
  { value: "USD", label: "미국 USD", icon: usdSvg },
  { value: "JPY", label: "일본 JPY", icon: jpySvg },
];

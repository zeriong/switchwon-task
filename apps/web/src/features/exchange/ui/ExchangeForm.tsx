"use client";

import Image from "next/image";
import { Box } from "@repo/ui/Box";
import { CTAButton } from "@repo/ui/CTAButton";
import { InputBox } from "@repo/ui/InputBox";
import { twMerge } from "tailwind-merge";
import { useExchangeForm } from "../model/useExchangeForm";
import CurrencySelect from "./CurrencySelect";
import downArrowSvg from "@/shared/assets/svg/down_outline_circle.svg";

// 환전 폼 컴포넌트
export default function ExchangeForm() {
  const { form, state, actions } = useExchangeForm();
  const { handleSubmit } = form;
  const {
    currency,
    currentRate,
    errorMessage,
    isPending,
    isBuy,
    isDisabled,
    buttonText,
    formattedAmount,
    calculatedKrwAmount,
  } = state;

  // 통화별 텍스트
  const currencyText = currency === "USD" ? "달러" : "엔화";
  const { onSubmit, setMode, setCurrency, onAmountChange } = actions;

  return (
    <Box className="h-fit bg-pr-gray-0">
      {/* 통화 선택 */}
      <div className="mb-4 md:mb-6">
        <CurrencySelect value={currency} onChange={setCurrency} />
      </div>

      {/* 살래요/팔래요 탭 */}
      <div className="flex gap-2 mb-6 md:mb-8 bg-white p-2 rounded-2xl border border-pr-gray-300">
        <button
          type="button"
          onClick={() => setMode("BUY")}
          className={twMerge(
            "flex-1 py-3 md:py-4 font-bold text-sm md:text-base transition-colors rounded-xl cursor-pointer",
            isBuy
              ? "bg-pr-default-red text-white"
              : "bg-pr-gray-100 text-pr-gray-500",
          )}
        >
          살래요
        </button>
        <button
          type="button"
          onClick={() => setMode("SELL")}
          className={twMerge(
            "flex-1 py-3 md:py-4 rounded-lg font-bold text-sm md:text-base transition-colors cursor-pointer",
            !isBuy
              ? "bg-pr-blue-500 text-white"
              : "bg-pr-gray-100 text-pr-gray-500",
          )}
        >
          팔래요
        </button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 md:space-y-6"
      >
        {/* 금액 입력 */}
        <div>
          <label className="block text-sm md:text-base text-pr-gray-600 mb-2">
            {isBuy ? "매수 금액" : "매도 금액"}
          </label>
          <InputBox
            theme="white"
            type="text"
            inputMode="decimal"
            placeholder="0"
            containerClassName="p-4 md:p-5"
            className="text-right text-lg md:text-xl font-medium"
            appendContent={
              <span className="text-sm md:text-[20px] font-medium text-pr-gray-600 whitespace-nowrap">
                {isBuy ? `${currencyText} 사기` : `${currencyText} 팔기`}
              </span>
            }
            value={formattedAmount}
            onChange={onAmountChange}
          />
        </div>

        {/* 화살표 */}
        <div className="flex justify-center">
          <Image
            src={downArrowSvg}
            alt="arrow"
            width={40}
            height={40}
            className="w-8 h-8 md:w-10 md:h-10"
          />
        </div>

        {/* 견적 결과 */}
        <div>
          <label className="block text-sm md:text-base text-pr-gray-600 mb-2">
            {isBuy ? "필요 원화" : "받을 원화"}
          </label>
          <InputBox
            theme="gray"
            readOnly
            value={calculatedKrwAmount.toLocaleString()}
            containerClassName="p-4 md:p-5"
            className="text-right text-lg md:text-xl font-medium"
            appendContent={
              <span
                className={twMerge(
                  "text-sm md:text-[20px] font-bold whitespace-nowrap",
                  isBuy ? "text-pr-default-red" : "text-pr-blue-500",
                )}
              >
                {isBuy ? "원 필요해요" : "원 받아요"}
              </span>
            }
          />
        </div>

        {/* 에러 메시지 */}
        {errorMessage && (
          <p className="p-3 bg-red-50 text-pr-default-red text-sm rounded-lg">
            {errorMessage}
          </p>
        )}

        {/* 구분선 + 적용 환율 */}
        <div className="border-t border-pr-divider-gray pt-4 md:pt-6">
          <div className="flex justify-between items-center text-sm md:text-base">
            <span className="text-pr-gray-600">적용 환율</span>
            <span className="text-pr-gray-800">
              1 {currency} = {currentRate?.rate.toLocaleString() || "-"} 원
            </span>
          </div>
        </div>

        {/* 환전 버튼 */}
        <CTAButton type="submit" disabled={isDisabled} isPending={isPending}>
          {buttonText}
        </CTAButton>
      </form>
    </Box>
  );
}

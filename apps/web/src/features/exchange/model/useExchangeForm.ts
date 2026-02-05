"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient, useQuery, keepPreviousData } from "@tanstack/react-query";
import {
	useExchangeRates,
	useExchangeMutation,
	useWallet,
	QUERY_KEYS,
} from "./exchange.queries";
import { getQuote } from "../api/exchange.api";
import { useDebounce } from "@/shared/lib/useDebounce";
import { useToastStore } from "@/shared/store/toastStore";
import type { TabMode, Currency } from "./exchange.types";
import { TOAST_MESSAGES, ERROR_MESSAGES } from "@/shared/constants/messages";
import { API_CONFIG } from "@/shared/constants/config";

interface FormValues {
	amount: string;
}

// API 에러 정보 추출 헬퍼
function getApiError(error: Error): {
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

// 환전 폼 로직 훅
export function useExchangeForm() {
	const queryClient = useQueryClient();
	const [mode, setMode] = useState<TabMode>("BUY");
	const [currency, setCurrency] = useState<Currency>("USD");
	const [errorMessage, setErrorMessage] = useState("");
	const { showToast } = useToastStore();

	const { watch, handleSubmit, setValue } = useForm<FormValues>({
		mode: "onChange",
	});

	const amount = watch("amount");
	const debouncedAmount = useDebounce(amount, API_CONFIG.INPUT_DEBOUNCE_TIME);

	const { data: rates } = useExchangeRates();
	const { data: wallet } = useWallet();
	const exchangeMutation = useExchangeMutation();
	const currentRate = rates?.find((r) => r.currency === currency);

	// 견적 조회 (디바운스 적용)
	const {
		data: quoteData,
		isFetching: isQuoteFetching,
	} = useQuery({
		queryKey: ["quote", mode, currency, debouncedAmount],
		queryFn: () =>
			getQuote({
				fromCurrency: mode === "BUY" ? "KRW" : currency,
				toCurrency: mode === "BUY" ? currency : "KRW",
				forexAmount: Number(debouncedAmount),
			}),
		enabled: !!debouncedAmount && Number(debouncedAmount) > 0,
		retry: false,
		placeholderData: keepPreviousData,
	});

	// 잔액 부족 여부 확인
	const isInsufficientBalance = useMemo(() => {
		if (!wallet || !quoteData || !amount || Number(amount) <= 0) return false;

		if (mode === "BUY") {
			// 살래요: KRW 잔액이 필요 원화보다 적으면 잔액 부족
			const krwWallet = wallet.wallets.find((w) => w.currency === "KRW");
			return (krwWallet?.balance ?? 0) < quoteData.krwAmount;
		}
		// 팔래요: 해당 통화 잔액이 입력 금액보다 적으면 잔액 부족
		const currencyWallet = wallet.wallets.find((w) => w.currency === currency);
		return (currencyWallet?.balance ?? 0) < Number(amount);
	}, [wallet, quoteData, amount, mode, currency]);

	// 환전 실행
	const onSubmit = (data: FormValues) => {
		setErrorMessage("");
		if (!currentRate) {
			showToast(TOAST_MESSAGES.EXCHANGE.LOADING_RATES, "info");
			return;
		}

		exchangeMutation.mutate(
			{
				exchangeRateId: currentRate.exchangeRateId,
				fromCurrency: mode === "BUY" ? "KRW" : currency,
				toCurrency: mode === "BUY" ? currency : "KRW",
				forexAmount: Number(data.amount),
			},
			{
				onSuccess: () => {
					showToast(TOAST_MESSAGES.EXCHANGE.SUCCESS, "success");
					setValue("amount", "");
					setErrorMessage("");
				},
				onError: (error: Error) => {
					const { code, message } = getApiError(error);

					if (code === "EXCHANGE_RATE_MISMATCH") {
						setErrorMessage(ERROR_MESSAGES.RATE_CHANGED);
						queryClient.invalidateQueries({ queryKey: QUERY_KEYS.RATES });
						queryClient.invalidateQueries({ queryKey: ["quote"] });
					} else if (code === "WALLET_INSUFFICIENT_BALANCE") {
						showToast(TOAST_MESSAGES.EXCHANGE.INSUFFICIENT_BALANCE, "error");
					} else if (message) {
						showToast(message, "error");
					} else {
						showToast(TOAST_MESSAGES.EXCHANGE.FAILURE, "error");
					}
				},
			},
		);
	};

	// 모드 변경 핸들러 (금액 유지, 실시간 재계산)
	const handleSetMode = (newMode: TabMode) => {
		setMode(newMode);
		setErrorMessage("");
	};

	// 통화 변경 핸들러 (금액 유지, 실시간 재계산)
	const handleSetCurrency = (newCurrency: Currency) => {
		setCurrency(newCurrency);
		setErrorMessage("");
	};

	// 금액 입력 핸들러 (콤마 포맷팅 + 선행 0 제거)
	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		// 빈 값이면 그대로 설정
		if (value === "") {
			setValue("amount", "");
			return;
		}
		// 콤마 제거 후 숫자와 소수점만 허용
		const rawValue = value.replace(/,/g, "").replace(/[^\d.]/g, "");
		// 선행 0 제거 (소수점 케이스 처리: "0." 허용)
		const sanitized = rawValue.replace(/^0+(?=\d)/, "");
		setValue("amount", sanitized);
	};

	// 포맷된 금액 (천 단위 구분자)
	const formattedAmount = useMemo(() => {
		if (!amount) return "";
		const num = Number(amount);
		if (Number.isNaN(num)) return amount;
		// 소수점이 있는 경우 처리
		if (amount.includes(".")) {
			const [integer, decimal] = amount.split(".");
			return `${Number(integer).toLocaleString()}.${decimal}`;
		}
		return num.toLocaleString();
	}, [amount]);

	// 실시간 원화 계산 (현재 환율 기준, 즉시 반영)
	const calculatedKrwAmount = useMemo(() => {
		if (!amount || !currentRate || Number(amount) <= 0) return 0;
		return Math.round(Number(amount) * currentRate.rate);
	}, [amount, currentRate]);

	const isBuy = mode === "BUY";
	const isAmountEmpty = !amount || Number(amount) <= 0;
	const isDisabled =
		exchangeMutation.isPending ||
		isAmountEmpty ||
		!quoteData ||
		isQuoteFetching ||
		isInsufficientBalance;
	const buttonText = isInsufficientBalance ? "잔액 부족" : "환전하기";

	return {
		form: { handleSubmit },
		state: {
			mode,
			currency,
			currentRate,
			quoteData,
			isQuoteFetching,
			errorMessage,
			isPending: exchangeMutation.isPending,
			isBuy,
			isDisabled,
			isInsufficientBalance,
			buttonText,
			formattedAmount,
			calculatedKrwAmount,
		},
		actions: {
			onSubmit,
			setMode: handleSetMode,
			setCurrency: handleSetCurrency,
			onAmountChange: handleAmountChange,
		},
	};
}

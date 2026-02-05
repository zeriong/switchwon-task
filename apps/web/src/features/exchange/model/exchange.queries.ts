import { useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
	getExchangeRates,
	getWallet,
	getOrderHistory,
	requestExchange,
} from "../api/exchange.api";
import type { ExchangeRate, OrderRequest } from "./exchange.types";
import { API_CONFIG } from "@/shared/constants/config";

// Query Key 상수화
export const QUERY_KEYS = {
	RATES: ["exchangeRates"] as const,
	WALLET: ["wallet"] as const,
	HISTORY: ["orderHistory"] as const,
	QUOTE: ["quote"] as const,
};

// 환율 조회 (5초 폴링) - 환율 변경 시 관련 쿼리 무효화
export const useExchangeRates = () => {
	const queryClient = useQueryClient();
	const prevRatesRef = useRef<ExchangeRate[] | null>(null);

	const query = useQuery({
		queryKey: QUERY_KEYS.RATES,
		queryFn: getExchangeRates,
		refetchInterval: API_CONFIG.EXCHANGE_RATE_POLL_INTERVAL,
		staleTime: API_CONFIG.EXCHANGE_RATE_STALE_TIME,
	});

	// 환율 변경 감지 시 관련 쿼리 무효화
	useEffect(() => {
		if (!query.data) return;

		const prevRates = prevRatesRef.current;
		const currentRates = query.data;

		// 첫 로드가 아니고, 환율이 실제로 변경된 경우에만 무효화
		if (prevRates && hasRatesChanged(prevRates, currentRates)) {
			// 지갑 재조회 (총 보유 자산 재계산)
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WALLET });
			// 견적 재조회 (필요 원화 재계산)
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.QUOTE });
		}

		prevRatesRef.current = currentRates;
	}, [query.data, queryClient]);

	return query;
};

// 환율 변경 여부 확인
function hasRatesChanged(
	prev: ExchangeRate[],
	current: ExchangeRate[],
): boolean {
	if (prev.length !== current.length) return true;
	return prev.some((prevRate) => {
		const currRate = current.find((r) => r.currency === prevRate.currency);
		return !currRate || currRate.rate !== prevRate.rate;
	});
}

// 지갑 잔액 조회
export const useWallet = () => {
	return useQuery({
		queryKey: QUERY_KEYS.WALLET,
		queryFn: getWallet,
	});
};

// 환전 내역 조회
export const useOrderHistory = () => {
	return useQuery({
		queryKey: QUERY_KEYS.HISTORY,
		queryFn: getOrderHistory,
		staleTime: API_CONFIG.ORDER_HISTORY_STALE_TIME,
	});
};

// 환전 실행 Mutation
export const useExchangeMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: OrderRequest) => requestExchange(data),
		onSuccess: () => {
			// 성공 시 관련 쿼리 모두 무효화
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WALLET });
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.RATES });
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.HISTORY });
		},
	});
};

import {
	useQuery,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import {
	getExchangeRates,
	getWallet,
	getOrderHistory,
	requestExchange,
} from "../api/exchange.api";
import type { OrderRequest } from "./exchange.types";

// Query Key 상수화
export const QUERY_KEYS = {
	RATES: ["exchangeRates"] as const,
	WALLET: ["wallet"] as const,
	HISTORY: ["orderHistory"] as const,
	QUOTE: ["quote"] as const,
};

// 환율 조회 (60초 폴링)
export const useExchangeRates = () => {
	return useQuery({
		queryKey: QUERY_KEYS.RATES,
		queryFn: getExchangeRates,
		refetchInterval: 60000,
		staleTime: 30000,
	});
};

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
		staleTime: 60000,
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

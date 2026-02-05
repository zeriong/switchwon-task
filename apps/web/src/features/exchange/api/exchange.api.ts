import apiClient from "@/shared/api/axios";
import type { ApiResponse } from "@/shared/api/types";
import type {
	ExchangeRate,
	WalletResponse,
	QuoteRequest,
	QuoteResponse,
	OrderRequest,
	OrderHistory,
} from "../model/exchange.types";

// GET /exchange-rates/latest - 실시간 환율 조회
export const getExchangeRates = async (): Promise<ExchangeRate[]> => {
	const { data } =
		await apiClient.get<ApiResponse<ExchangeRate[]>>("/exchange-rates/latest");
	return data.data;
};

// GET /wallets - 지갑 잔액 조회
export const getWallet = async (): Promise<WalletResponse> => {
	const { data } =
		await apiClient.get<ApiResponse<WalletResponse>>("/wallets");
	return data.data;
};

// GET /orders/quote - 환전 견적 조회
export const getQuote = async (params: QuoteRequest): Promise<QuoteResponse> => {
	const { data } = await apiClient.get<ApiResponse<QuoteResponse>>(
		"/orders/quote",
		{ params },
	);
	return data.data;
};

// POST /orders - 환전 주문 실행
export const requestExchange = async (body: OrderRequest): Promise<string> => {
	const { data } = await apiClient.post<ApiResponse<string>>("/orders", body);
	return data.data;
};

// GET /orders - 환전 내역 조회
export const getOrderHistory = async (): Promise<OrderHistory[]> => {
	const { data } =
		await apiClient.get<ApiResponse<OrderHistory[]>>("/orders");
	return data.data;
};

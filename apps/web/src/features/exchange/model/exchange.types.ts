// 환율 정보
export interface ExchangeRate {
	exchangeRateId: number;
	currency: Currency;
	rate: number;
	changePercentage: number;
	applyDateTime: string;
}

// 지갑 아이템
export interface WalletItem {
	walletId: number;
	currency: "KRW" | Currency;
	balance: number;
}

// 지갑 응답
export interface WalletResponse {
	totalKrwBalance: number;
	wallets: WalletItem[];
}

// 환전 견적 요청
export interface QuoteRequest {
	fromCurrency: string;
	toCurrency: string;
	forexAmount: number;
}

// 환전 견적 응답
export interface QuoteResponse {
	krwAmount: number;
	appliedRate: number;
}

// 환전 주문 요청
export interface OrderRequest {
	exchangeRateId: number;
	fromCurrency: string;
	toCurrency: string;
	forexAmount: number;
}

// 환전 내역
export interface OrderHistory {
	orderId: number;
	fromCurrency: string;
	fromAmount: number;
	toCurrency: string;
	toAmount: number;
	appliedRate: number;
	orderedAt: string;
}

// 환전 모드 (살래요/팔래요)
export type TabMode = "BUY" | "SELL";

// 지원 통화
export type Currency = "USD" | "JPY";

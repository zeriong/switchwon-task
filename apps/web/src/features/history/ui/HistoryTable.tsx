"use client";

import { useState, useMemo } from "react";
import { format } from "date-fns";
import { Box } from "@repo/ui/Box";
import { Pagination } from "@repo/ui/Pagination";
import { useOrderHistory } from "@/features/exchange/model/exchange.queries";
import { PAGINATION_CONFIG, DATE_FORMATS } from "@/shared/constants/config";
import { EMPTY_MESSAGES } from "@/shared/constants/messages";

export default function HistoryTable() {
	const { data: history, isLoading } = useOrderHistory();
	const [currentPage, setCurrentPage] = useState(1);

	// 페이지네이션 계산
	const { paginatedData, totalPages } = useMemo(() => {
		if (!history) return { paginatedData: [], totalPages: 0 };

		const pageSize = PAGINATION_CONFIG.PAGE_SIZE;
		const total = Math.ceil(history.length / pageSize);
		const startIndex = (currentPage - 1) * pageSize;
		const sliced = history.slice(startIndex, startIndex + pageSize);

		return { paginatedData: sliced, totalPages: total };
	}, [history, currentPage]);

	if (isLoading) {
		return (
			<Box className="p-8 text-center text-pr-gray-500">
				{EMPTY_MESSAGES.LOADING}
			</Box>
		);
	}

	if (!history || history.length === 0) {
		return (
			<Box className="p-8 text-center text-pr-gray-500">
				{EMPTY_MESSAGES.NO_HISTORY}
			</Box>
		);
	}

	return (
		<>
			<Box className="overflow-x-auto p-0 pt-4 border-pr-gray-300">
				<table className="w-full">
					<thead>
						<tr className="border-y border-pr-gray-300">
							<th className="px-6 py-4 text-left text-sm font-normal text-pr-gray-600">
								거래 ID
							</th>
							<th className="px-6 py-4 text-left text-sm font-normal text-pr-gray-600">
								거래 일시
							</th>
							<th className="px-6 py-4 text-right text-sm font-normal text-pr-gray-600">
								매수 금액
							</th>
							<th className="px-6 py-4 text-right text-sm font-normal text-pr-gray-600">
								체결 환율
							</th>
							<th className="px-6 py-4 text-right text-sm font-normal text-pr-gray-600">
								매도 금액
							</th>
						</tr>
					</thead>
					<tbody>
						{paginatedData.map((order) => {
							// fromCurrency가 KRW면 외화 매수, 아니면 외화 매도
							const isBuyingForex = order.fromCurrency === "KRW";
							const buyAmount = isBuyingForex
								? order.toAmount
								: order.fromAmount;
							const buyCurrency = isBuyingForex
								? order.toCurrency
								: order.fromCurrency;
							const sellAmount = isBuyingForex
								? order.fromAmount
								: order.toAmount;

							return (
								<tr
									key={order.orderId}
									className="border-b border-pr-gray-100 last:border-b-0"
								>
									<td className="px-6 py-5 text-sm text-pr-gray-700">
										{order.orderId}
									</td>
									<td className="px-6 py-5 text-sm text-pr-gray-700">
										{format(new Date(order.orderedAt), DATE_FORMATS.HISTORY)}
									</td>
									<td className="px-6 py-5 text-sm text-pr-gray-700 text-right">
										{buyAmount.toLocaleString()} {buyCurrency}
									</td>
									<td className="px-6 py-5 text-sm text-pr-gray-700 text-right">
										{order.appliedRate.toLocaleString()} 원
									</td>
									<td className="px-6 py-5 text-sm text-pr-gray-700 text-right">
										{sellAmount.toLocaleString()} 원
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</Box>
			{/* 페이지네이션 */}
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={setCurrentPage}
				className="border-t border-pr-gray-100"
			/>
		</>
	);
}

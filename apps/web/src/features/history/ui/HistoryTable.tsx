"use client";

import { useState, useMemo } from "react";
import { format } from "date-fns";
import { Box } from "@repo/ui/Box";
import { Pagination } from "@repo/ui/Pagination";
import { useOrderHistory } from "@/features/exchange/model/exchange.queries";

const PAGE_SIZE = 10;

export default function HistoryTable() {
	const { data: history, isLoading } = useOrderHistory();
	const [currentPage, setCurrentPage] = useState(1);

	// 페이지네이션 계산
	const { paginatedData, totalPages } = useMemo(() => {
		if (!history) return { paginatedData: [], totalPages: 0 };

		const total = Math.ceil(history.length / PAGE_SIZE);
		const startIndex = (currentPage - 1) * PAGE_SIZE;
		const sliced = history.slice(startIndex, startIndex + PAGE_SIZE);

		return { paginatedData: sliced, totalPages: total };
	}, [history, currentPage]);

	if (isLoading) {
		return <Box className="p-8 text-center text-pr-gray-500">로딩 중...</Box>;
	}

	if (!history || history.length === 0) {
		return (
			<Box className="p-8 text-center text-pr-gray-500">
				환전 내역이 없습니다.
			</Box>
		);
	}

	return (
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
						const buyAmount = isBuyingForex ? order.toAmount : order.fromAmount;
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
									{format(new Date(order.orderedAt), "yyyy-MM-dd HH:mm:ss")}
								</td>
								<td className="px-6 py-5 text-sm text-pr-gray-700 text-right">
									{buyAmount.toLocaleString()}
								</td>
								<td className="px-6 py-5 text-sm text-pr-gray-700 text-right">
									{order.appliedRate.toLocaleString()}
								</td>
								<td className="px-6 py-5 text-sm text-pr-gray-700 text-right">
									{sellAmount.toLocaleString()}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>

			{/* 페이지네이션 */}
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={setCurrentPage}
				className="border-t border-pr-gray-100"
			/>
		</Box>
	);
}

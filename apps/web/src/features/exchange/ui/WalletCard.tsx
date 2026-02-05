"use client";

import { Box } from "@repo/ui/Box";
import { useWallet } from "../model/exchange.queries";
import { CURRENCY_SYMBOLS } from "@/shared/constants/currencies";
import LoadingSpinner from "@/shared/ui/LoadingSpinner";

// 지갑 카드 컴포넌트
export default function WalletCard() {
	const { data: wallet, isLoading } = useWallet();

	if (isLoading) {
		return (
			<LoadingSpinner
				withBox
				title="내 지갑"
				className="mt-4 md:mt-6 bg-pr-gray-0 grow"
			/>
		);
	}

	return (
		<Box
			as="section"
			className="mt-4 md:mt-6 bg-pr-gray-0 grow flex flex-col justify-between"
		>
			{/* 통화별 잔액 */}
			<div className="space-y-3 md:space-y-4">
				<h3 className="text-lg md:text-xl font-bold text-pr-gray-800 mb-4 md:mb-6">
					내 지갑
				</h3>

				{wallet?.wallets.map((item) => (
					<div
						key={item.walletId}
						className="flex justify-between items-center"
					>
						<span className="text-sm md:text-[20px] font-medium text-pr-gray-600">
							{item.currency}
						</span>
						<span className="text-sm md:text-[20px] font-semibold text-pr-gray-600">
							{CURRENCY_SYMBOLS[item.currency]} {item.balance.toLocaleString()}
						</span>
					</div>
				))}
			</div>

			{/* 총 보유 자산 */}
			<div className="flex justify-between items-center border-t border-pr-divider-gray pt-4 md:pt-6">
				<span className="text-sm md:text-[20px] font-medium text-pr-gray-600">
					총 보유 자산
				</span>
				<span className="text-base md:text-lg font-bold text-pr-blue-500">
					₩ {wallet?.totalKrwBalance.toLocaleString()}
				</span>
			</div>
		</Box>
	);
}

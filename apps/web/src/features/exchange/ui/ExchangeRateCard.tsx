"use client";

import Image from "next/image";
import { Box } from "@repo/ui/Box";
import { Spinner } from "@repo/ui/assets/icons/Spinner";
import { useExchangeRates } from "../model/exchange.queries";
import usdSvg from "@/shared/assets/svg/usd.svg";
import jpySvg from "@/shared/assets/svg/jpy.svg";
import upRedSvg from "@/shared/assets/svg/up_red.svg";
import downBlueSvg from "@/shared/assets/svg/down_blue.svg";

const currencyInfo = {
	USD: { icon: usdSvg, name: "미국 달러" },
	JPY: { icon: jpySvg, name: "일본 엔화" },
};

// 환율 정보 카드 컴포넌트
export default function ExchangeRateCard() {
	const { data: rates, isLoading } = useExchangeRates();

	return (
		<section>
			{/* 환율 카드 목록 */}
			{isLoading ? (
				<div className="flex justify-center py-8">
					<Spinner color="#3479EB" />
				</div>
			) : (
				<div className="grid grid-cols-2 gap-3 md:gap-4">
					{rates?.map((rate) => {
						const info = currencyInfo[rate.currency];
						const isPositive = rate.changePercentage > 0;

						return (
							<Box key={rate.exchangeRateId} className="p-4 md:p-5">
								<div className="flex justify-between items-start mb-2 md:mb-3">
									<div className="flex items-center gap-2">
										<Image
											src={info.icon}
											alt={rate.currency}
											width={24}
											height={24}
											className="w-5 h-5 md:w-6 md:h-6"
										/>
										<span className="font-bold text-pr-gray-800 text-sm md:text-base">
											{rate.currency}
										</span>
									</div>
									<span className="text-xs md:text-sm text-pr-gray-600">
										{info.name}
									</span>
								</div>

								<div className="text-lg md:text-xl font-bold text-pr-gray-800 mb-1">
									{rate.rate.toLocaleString()} KRW
								</div>

								<div
									className={`flex items-center gap-1 text-xs md:text-sm ${
										isPositive ? "text-pr-default-red" : "text-pr-blue-500"
									}`}
								>
									<Image
										src={isPositive ? upRedSvg : downBlueSvg}
										alt={isPositive ? "up" : "down"}
										width={12}
										height={12}
										className="w-3 h-3"
									/>
									<span>
										{isPositive ? "+" : ""}
										{rate.changePercentage}%
									</span>
								</div>
							</Box>
						);
					})}
				</div>
			)}
		</section>
	);
}

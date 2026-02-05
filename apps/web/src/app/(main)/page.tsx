import ExchangeRateCard from "@/features/exchange/ui/ExchangeRateCard";
import WalletCard from "@/features/exchange/ui/WalletCard";
import ExchangeForm from "@/features/exchange/ui/ExchangeForm";

export default function ExchangePage() {
	return (
		<main className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
			{/* 제목 */}
			<h2 className="text-xl md:text-[40px] font-bold text-pr-gray-800 mb-2">
				환율 정보
			</h2>
			<p className="text-sm md:text-base text-pr-gray-700 mb-4 md:mb-10">
				실시간 환율을 확인하고 간편하게 환전하세요.
			</p>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
				{/* 왼쪽: 환율 정보 + 지갑 */}
				<div className="flex flex-col h-full">
					<ExchangeRateCard />
					<WalletCard />
				</div>

				{/* 오른쪽: 환전 폼 */}
				<div>
					<ExchangeForm />
				</div>
			</div>
		</main>
	);
}

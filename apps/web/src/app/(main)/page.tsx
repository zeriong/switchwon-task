import {
	ExchangeRateCard,
	WalletCard,
	ExchangeForm,
} from "@/features/exchange";
import { PageHeader } from "@/shared/ui";

export default function ExchangePage() {
	return (
		<main className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
			<PageHeader
				title="환율 정보"
				description="실시간 환율을 확인하고 간편하게 환전하세요."
			/>

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

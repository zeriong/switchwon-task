import HistoryTable from "@/features/history/ui/HistoryTable";

export default function HistoryPage() {
	return (
		<main className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
			{/* 제목 */}
			<h2 className="text-xl md:text-[40px] font-bold text-pr-gray-800 mb-2">
				환전 내역
			</h2>
			<p className="text-sm md:text-base text-pr-gray-700 mb-4 md:mb-6">
				환전 내역을 확인하실 수 있어요.
			</p>

			{/* 테이블 */}
			<HistoryTable />
		</main>
	);
}

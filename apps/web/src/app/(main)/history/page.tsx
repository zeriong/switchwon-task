import { HistoryTable } from "@/features/history";
import { PageHeader } from "@/shared/ui";

export default function HistoryPage() {
	return (
		<main className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
			<PageHeader
				title="환전 내역"
				description="환전 내역을 확인하실 수 있어요."
			/>
			<HistoryTable />
		</main>
	);
}

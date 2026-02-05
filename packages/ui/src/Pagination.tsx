import { twMerge } from "tailwind-merge";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	className?: string;
}

export function Pagination({
	currentPage,
	totalPages,
	onPageChange,
	className,
}: PaginationProps) {
	if (totalPages <= 1) return null;

	// 페이지 번호 배열 생성
	const pageNumbers: number[] = [];
	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i);
	}

	return (
		<div
			className={twMerge(
				"flex justify-center items-center gap-2 py-6",
				className,
			)}
		>
			{/* 이전 버튼 */}
			<button
				type="button"
				onClick={() => onPageChange(Math.max(1, currentPage - 1))}
				disabled={currentPage === 1}
				className="px-3 py-2 text-sm text-pr-gray-600 hover:bg-pr-gray-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
			>
				이전
			</button>

			{/* 페이지 번호 */}
			{pageNumbers.map((page) => (
				<button
					key={page}
					type="button"
					onClick={() => onPageChange(page)}
					className={twMerge(
						"w-9 h-9 text-sm rounded-lg transition-colors",
						currentPage === page
							? "bg-pr-blue-500 text-white"
							: "text-pr-gray-600 hover:bg-pr-gray-100",
					)}
				>
					{page}
				</button>
			))}

			{/* 다음 버튼 */}
			<button
				type="button"
				onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
				disabled={currentPage === totalPages}
				className="px-3 py-2 text-sm text-pr-gray-600 hover:bg-pr-gray-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
			>
				다음
			</button>
		</div>
	);
}

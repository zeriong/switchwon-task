"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
	const pathname = usePathname();

	// pathname 변경 시 스크롤 초기화 의도
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}

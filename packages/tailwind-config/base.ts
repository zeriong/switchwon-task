import type { Config } from "tailwindcss";

/** 모노레포 앱에서 사용할 공용 Tailwind 설정 */
export const baseConfig: Partial<Config> = {
	content: [
		// 각 앱의 소스
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
		// 공용 UI 패키지
		"../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
	],
};

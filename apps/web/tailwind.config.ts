import type { Config } from "tailwindcss";
import { baseConfig } from "@repo/tailwind-config";

const config: Config = {
	...baseConfig,
	// 앱별 추가 설정 가능
};

export default config;

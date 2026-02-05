import type { JSX } from "react";
import { twMerge } from "tailwind-merge";
import type { InputBoxProps, InputBoxTheme } from "./types";

export function InputBox({
	theme = "white",
	prependContent,
	appendContent,
	containerClassName,
	className,
	readOnly,
	...rest
}: InputBoxProps): JSX.Element {
	const themeStyles: Record<InputBoxTheme, string> = {
		white: "bg-white border border-pr-gray-700",
		gray: "bg-pr-gray-100 border border-pr-gray-500",
	};

	return (
		<div
			className={twMerge(
				"flex justify-center items-center gap-2.5 self-stretch",
				"p-6 rounded-xl transition-colors",
				themeStyles[theme || "white"],
				!readOnly && "focus-within:border-pr-blue-500",
				containerClassName,
			)}
		>
			{prependContent && (
				<div className="flex items-center gap-2.5 shrink-0">
					{prependContent}
				</div>
			)}
			<input
				{...rest}
				readOnly={readOnly}
				className={twMerge(
					"flex-1 w-full h-full bg-transparent text-pr-gray-600",
					"text-[20px] font-semibold outline-none placeholder:text-pr-gray-400",
					className,
				)}
			/>
			{appendContent && (
				<div className="flex items-center gap-2.5 shrink-0">
					{appendContent}
				</div>
			)}
		</div>
	);
}

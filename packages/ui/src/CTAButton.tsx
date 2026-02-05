"use client";

import { type JSX, useLayoutEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { Spinner } from "./assets/icons";
import type { CTAButtonProps } from "./types";

export function CTAButton({
	children,
	className,
	isPending,
	pendingIcon,
	disabled,
	onClick,
	...rest
}: CTAButtonProps): JSX.Element {
	const isDisabled = disabled || isPending;
	const contentRef = useRef<HTMLSpanElement>(null);
	const savedDimensionsRef = useRef<{ width: number; height: number } | null>(
		null,
	);

	// 사용자 경험 향상을 위한 width/height 저장
	// (isPending이 true/false로 변경되어도 버튼의 크기가 변경되지 않음)
	useLayoutEffect(() => {
		if (!isPending && contentRef.current) {
			savedDimensionsRef.current = {
				width: contentRef.current.offsetWidth,
				height: contentRef.current.offsetHeight,
			};
		}
	}, [isPending]);

	const dimensions = isPending ? savedDimensionsRef.current : null;

	return (
		<button
			{...rest}
			disabled={isDisabled}
			onClick={isDisabled ? undefined : onClick}
			className={twMerge(
				"flex justify-center items-center gap-2.5 self-stretch",
				"w-full py-4 lg:py-6 px-2.5 rounded-xl",
				"bg-cta-1-default hover:bg-cta-1-hover",
				"text-white text-[18px] lg:text-[22px] font-semibold",
				"transition-colors cursor-pointer",
				"disabled:opacity-50 disabled:cursor-default disabled:pointer-events-none",
				className,
			)}
		>
			<span
				ref={contentRef}
				style={
					dimensions
						? { width: dimensions.width, height: dimensions.height }
						: undefined
				}
				className="flex justify-center items-center"
			>
				{isPending ? pendingIcon ?? <Spinner /> : children}
			</span>
		</button>
	);
}

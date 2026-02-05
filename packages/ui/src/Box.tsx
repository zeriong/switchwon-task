import type { ElementType, JSX } from "react";
import { twMerge } from "tailwind-merge";
import type { BoxProps, BoxTag } from "./types";

export function Box<T extends BoxTag = "div">({
	children,
	className,
	as,
	...rest
}: BoxProps<T>): JSX.Element {
	const Component = (as ?? "div") as ElementType;

	return (
		<Component
			{...rest}
			className={twMerge(
				"px-8 py-6 rounded-xl border border-pr-gray-300 w-full",
				className,
			)}
		>
			{children}
		</Component>
	);
}

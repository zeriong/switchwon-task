import type { JSX } from "react";
import { twMerge } from "tailwind-merge";
import type { SpinnerProps } from "../../types";

export function Spinner({
	className,
	color = "white",
}: SpinnerProps): JSX.Element {
	return (
		<svg
			className={twMerge("animate-spin h-5 w-5", className)}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			aria-hidden="true"
		>
			<circle
				opacity={0.25}
				cx="12"
				cy="12"
				r="10"
				stroke={color}
				strokeWidth="4"
			/>
			<path
				opacity={0.75}
				fill={color}
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			/>
		</svg>
	);
}

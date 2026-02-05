import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type InputBoxTheme = "white" | "gray";

export interface InputBoxProps extends ComponentPropsWithoutRef<"input"> {
	theme?: InputBoxTheme;
	prependContent?: ReactNode;
	appendContent?: ReactNode;
	containerClassName?: string;
}

import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type BoxTag =
	| "div"
	| "section"
	| "article"
	| "aside"
	| "main"
	| "header"
	| "footer"
	| "nav";

export type BoxProps<T extends BoxTag = "div"> = ComponentPropsWithoutRef<T> & {
	children: ReactNode;
	className?: string;
	as?: T;
};

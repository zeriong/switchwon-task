import type { ComponentPropsWithoutRef, ReactNode } from "react";

export interface CTAButtonProps extends ComponentPropsWithoutRef<"button"> {
	children: ReactNode;
	isPending?: boolean;
	pendingIcon?: ReactNode;
}

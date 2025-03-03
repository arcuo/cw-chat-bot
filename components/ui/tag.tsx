import { cn } from "@/lib/utils";
import type { HtmlHTMLAttributes } from "react";

export const Tag = ({
	className,
	...props
}: HtmlHTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn(
			"h-fit w-fit whitespace-nowrap rounded-sm bg-neutral-900/10 px-2 py-1 text-xs",
			className,
		)}
		{...props}
	/>
);

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export const Kbd = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
	({ children, className, ...props }, ref) => {
		return (
			<kbd
				ref={ref}
				className={cn(
					"inline-flex h-5 max-h-full items-center rounded border bg-background px-1 font-[inherit] font-medium text-[0.625rem] text-muted-foreground/70",
					className,
				)}
				{...props}
			>
				{children}
			</kbd>
		);
	},
);

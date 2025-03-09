"use client";

import { useState, type HTMLAttributes } from "react";
import { Tooltip } from "./tooltip";
import { cn } from "@/lib/utils";

export const EmailCopy = ({
	className,
	...props
}: HTMLAttributes<HTMLButtonElement>) => {
	const [copied, setCopied] = useState(false);

	return (
		<Tooltip
			open={copied ?? undefined}
			content={copied ? "Copied!" : "Click to copy"}
			contentProps={{ side: "top" }}
		>
			<button
				type="button"
				className={cn(
					"cursor-copy text-left not-italic transition-colors hover:text-amber-700",
					className,
				)}
				onClick={() => {
					navigator.clipboard.writeText("benjamin.zachariae@gmail.com");
					setCopied(true);
					setTimeout(() => setCopied(false), 5000);
				}}
				{...props}
			>
				benjamin.zachariae@gmail.com
			</button>
		</Tooltip>
	);
};

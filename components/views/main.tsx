"use client";

import { cn } from "@/lib/utils";
import { motion, type Variants } from "motion/react";
import type { PropsWithChildren } from "react";

export const navVariants: Variants = {
	navHidden: {
		x: -20,
		opacity: 0,
	},
	navShown: {
		x: 0,
		opacity: 1,
	},
};

export function Main({
	children,
	className,
}: PropsWithChildren<{ className?: string }>) {
	return (
		<motion.main
			id="main-container"
			initial="navHidden"
			animate="navShown"
			variants={navVariants}
			className={cn(
				"@container px-15 py-5 max-md:max-w-full max-lg:px-5",
				className,
			)}
		>
			{children}
		</motion.main>
	);
}

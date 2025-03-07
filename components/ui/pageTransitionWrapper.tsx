"use client";

import { motion, type Variant, type Variants } from "motion/react";
import type { ComponentProps } from "react";

export type PageTransitionVariants = Variants & {
	hidden: Variant;
	shown: Variant;
};

const variants: PageTransitionVariants = {
	hidden: { opacity: 0, x: -20 },
	shown: { opacity: 1, x: 0 },
};

export const PageTranstionWrapper = ({
	children,
	className,
	...rest
}: ComponentProps<typeof motion.div>) => {
	return (
		<motion.div
			initial="hidden"
			animate="shown"
			className={className}
			variants={variants}
			{...rest}
		>
			{children}
		</motion.div>
	);
};

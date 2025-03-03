"use client";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { debounce } from "ts-debounce";

/** Component that scrolls the x-axis when hovered */
export const ScrollXHover = (
	props: React.ComponentProps<typeof motion.div>,
) => {
	const { children, className, ...rest } = props;
	const ref = useRef<HTMLDivElement>(null);

	const scroll = useScroll({ container: ref });

	const x = useMotionValue(0);

	return (
		<motion.div
			ref={ref}
			className={cn("flex gap-2 overflow-x-auto p-4", className)}
			style={{ x }}
			{...rest}
		>
			{children}
		</motion.div>
	);
};

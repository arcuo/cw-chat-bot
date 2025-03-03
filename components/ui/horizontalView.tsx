"use client";
import { cn } from "@/lib/utils";
import { motion, useSpring } from "motion/react";
import { useRef } from "react";

/** Component that scrolls the x-axis when hovered */
export const HorizontalView = (
	props: React.ComponentProps<typeof motion.div>,
) => {
	const { children, className, ...rest } = props;
	const containerRef = useRef<HTMLDivElement>(null);
	const innerRef = useRef<HTMLDivElement>(null);

	const x = useSpring(0, { stiffness: 100, bounce: 0.01, visualDuration: 0.2 });
	const scrollSpeed = 200;

	const handleScrollLeft = () => {
		x.set(Math.min(x.get() + scrollSpeed, 0));
	};

	const handleScrollRight = () => {
		const containerRect = containerRef.current?.getBoundingClientRect();

		if (!innerRef.current || !containerRect) {
			return;
		}
		x.set(
			Math.max(
				x.get() - scrollSpeed,
				-(innerRef.current?.scrollWidth - containerRect.width),
			),
		);
	};

	return (
		// biome-ignore lint/a11y/useKeyWithMouseEvents: <explanation>
		<div
			className="w-full p-4"
			ref={containerRef}
			data-name="scroll-container"
			onWheel={(e) => {
				if (e.deltaY > 0) {
					handleScrollRight();
				} else if (e.deltaY < 0) {
					handleScrollLeft();
				}
			}}
			// onMouseOver={(e) => {
			// 	const containerRect = containerRef.current?.getBoundingClientRect();

			// 	// TODO rework?

			// 	if (!containerRect) {
			// 		return;
			// 	}

			// 	const mouseXOnContainer = e.clientX - containerRect.left;

			// 	if (mouseXOnContainer < containerRect.width / 3) {
			// 		handleScrollLeft();
			// 	}

			// 	if (mouseXOnContainer > (containerRect.width / 3) * 2) {
			// 		handleScrollRight();
			// 	}
			// }}
		>
			<motion.div
				data-name="scroll-inner"
				ref={innerRef}
				className={cn("flex gap-2", className)}
				style={{ x }}
				{...rest}
			>
				{children}
			</motion.div>
		</div>
	);
};

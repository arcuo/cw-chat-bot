"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, hover, motion, useSpring } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button } from "./button";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import useMeasure from "react-use-measure";

/** Component that scrolls the x-axis when hovered */
export const HorizontalView = (
	props: React.ComponentProps<typeof motion.div>,
) => {
	const { children, className, ...rest } = props;
	const containerRef = useRef<HTMLDivElement>(null);
	const innerRef = useRef<HTMLDivElement>(null);
	const [overflowing, setOverflowing] = useState(false);

	const x = useSpring(0, { stiffness: 100, bounce: 0.01, visualDuration: 0.2 });
	const scrollSpeed = 75;

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

	function checkOverflow() {
		const innerRect = innerRef.current?.getBoundingClientRect();
		setOverflowing(
			(innerRect?.left ?? 0) + (innerRef.current?.scrollWidth ?? 0) >
				window.innerWidth,
		);
	}

	useLayoutEffect(() => {
		checkOverflow();
		const controller = new AbortController();
		window.addEventListener(
			"resize",
			() => {
				x.set(0);
				checkOverflow();
			},
			{ signal: controller.signal },
		);
		return () => controller.abort();
	}, []);

	// TODO remove navigation buttons if no scroll needed

	return (
		<div
			className="flex w-full flex-col gap-4 pt-4"
			ref={containerRef}
			data-name="scroll-container"
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
			{/* navigation buttons */}
			{overflowing && (
				<div className="flex gap-2 overflow-hidden p-1">
					<Button
						onClick={handleScrollLeft}
						onHoldDown={handleScrollLeft}
						className="flex w-15 justify-center"
					>
						<ArrowLeftIcon />
					</Button>
					<Button
						onClick={handleScrollRight}
						onHoldDown={handleScrollRight}
						className="flex w-15 justify-center"
					>
						<ArrowRightIcon />
					</Button>
				</div>
			)}
		</div>
	);
};

"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Nova_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const font_mono = Nova_Mono({ subsets: ["latin"], weight: ["400"] });

export default function Home() {
	return (
		<div>
			<motion.h1
				className="w-[90%] text-balance font-bold text-6xl leading-18"
				layout
			>
				<p>
					<ScrollingWord
						words={["Adaptable", "Versatile", "Effective", "Agreeable"]}
					/>{" "}
					Software Developer
				</p>
				<p>
					Developing{" "}
					<ScrollingWord
						words={["accessible", "responsive", "performant"]}
					/>{" "}
					web applications
				</p>
			</motion.h1>
		</div>
	);
}

const variants: Variants = {
	initial: { y: 100 },
	animate: { y: 0 },
	exit: { y: -100 },
};

export const ScrollingWord = ({ words }: { words: string[] }) => {
	const [index, setIndex] = useState(0);
	const ref = useRef<HTMLSpanElement>(null);

	const sortedWords = useMemo(
		() => words.sort((a, b) => b.length - a.length),
		[words],
	);

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((i) => (i + 1) % words.length);
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	return (
		<motion.span className="relative inline-block overflow-hidden text-justify align-bottom">
			<AnimatePresence mode="popLayout" initial={false}>
				{sortedWords.map((w, i) => {
					if (index === i) {
						return (
							<motion.span
								ref={ref}
								className={cn(
									font_mono.className,
									"inline-block font-bold text-amber-700",
								)}
								key={`${w}-${i}`}
								initial="initial"
								animate="animate"
								exit="exit"
								transition={{ duration: 0.5, ease: [0.55, 0, 1, 0.45] }}
								variants={variants}
							>
								{w}
							</motion.span>
						);
					}
				})}
			</AnimatePresence>
		</motion.span>
	);
};

"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Sono } from "next/font/google";
import { cn } from "@/lib/utils";
import { EmailCopy } from "@/components/ui/emailCopy";
import { LinkButton } from "@/components/ui/button";
import {
	PageTranstionWrapper,
	type PageTransitionVariants,
} from "@/components/ui/pageTransitionWrapper";

const font_mono = Sono({ subsets: ["latin"], weight: ["500"] });

export default function Home() {
	return (
		<PageTranstionWrapper className="flex flex-col gap-7">
			<motion.h1
				className="col-span-2 w-[90%] text-balance font-bold text-6xl leading-18"
				layout
			>
				<p>
					<ScrollingWord
						words={["Adaptable", "Versatile", "Effective"]}
					/>{" "}
					Software Developer
				</p>
				<p>
					Developing{" "}
					<ScrollingWord words={["accessible", "responsive", "performant"]} />{" "}
					web applications
				</p>
			</motion.h1>
			<div className="ml-7 w-[60%] text-balance text-xl max-xl:ml-0 max-xl:w-[90%] [&>p]:mb-5">
				<p>
					I am a skilled developer with over 8 years of programming experience
					in Frontend development and Frontend Technical Leading. I have
					developed funky animated designs as well as professional{" "}
					<span className="text-amber-700">WCAG</span> compliant software being
					used by organisations around the world.
				</p>
				<p>
					I am a social and team-oriented person and I work to develop great
					customer and developer experience. I am a great collaborator and
					leader.
				</p>
				<p>
					I invite you to build your own tailored resume using{" "}
					<span className="text-amber-700">AI (RAG)</span>{" "}
					<LinkButton
						href="/experience"
						className="ml-2 inline-block px-2 py-[1px]"
					>
						Fancy AI experience!
					</LinkButton>
				</p>
				<p className="text-neutral-500">
					... or if AI is not your thing, check out{" "}
					<LinkButton
						href="/resume"
						className="ml-2 inline-block px-2 py-[1px]"
					>
						less fancy, but still pretty neat resume
					</LinkButton>
				</p>
			</div>
			{/* <LinkButton
				href="mailto:benjamin.zachariae@gmail.com"
				className="row-start-3 ml-7 h-fit w-fit px-6 py-3 max-xl:ml-0"
			>
				Contact me!
			</LinkButton> */}

			<motion.div
				variants={rightSideVariants}
				transition={{ delay: 1 }}
				className="fixed right-[15%] bottom-[15%] flex size-[400px] items-center justify-center rounded-lg border border-neutral-400 max-xl:relative max-xl:right-0 max-xl:bottom-0"
			>
				3D thing?
			</motion.div>
			<motion.address
				variants={rightSideVariants}
				transition={{ delay: 1.4 }}
				className="fixed right-[2.5%] bottom-[5%] tracking-[4px]"
			>
				<EmailCopy className="[writing-mode:vertical-rl]" />
			</motion.address>
		</PageTranstionWrapper>
	);
}

const rightSideVariants: PageTransitionVariants = {
	hidden: { x: 20, opacity: 0 },
	shown: { x: 0, opacity: 1 },
};

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
		const interval = setInterval(async () => {
			await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
			setIndex((i) => (i + 1) % words.length);
		}, 4000);
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
								transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
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

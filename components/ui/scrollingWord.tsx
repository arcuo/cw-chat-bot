import type { TextTailwindColor } from "@/lib/types/tailwind";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, type Variants } from "motion/react";
import {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
	useState,
	type PropsWithChildren,
} from "react";

const variants: Variants = {
	initial: { y: 150 },
	animate: { y: 0 },
	exit: { y: -150 },
};

export const ScrollingWord = forwardRef<
	{ scrollWord: (index?: number) => void },
	PropsWithChildren<{
		words: string[];
		color?: TextTailwindColor;
		active?: boolean;
		delay?: number;
	}>
>(({ words, color = "text-amber-700", active, delay, children }, ref) => { 
	const [index, setIndex] = useState(0);
	const innerref = useRef<HTMLSpanElement>(null);

	const sortedWords = useMemo(
		() => words.sort((a, b) => b.length - a.length),
		[words],
	);

	function scrollWord(index?: number) {
		if (index !== undefined) {
			setIndex(index);
		} else {
			setIndex((i) => (i + 1) % words.length);
		}
	}

	useImperativeHandle(ref, () => ({
		scrollWord,
	}));

	useEffect(() => {
		if (!active) return;
		const interval = setInterval(async () => {
			await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
			setIndex((i) => (i + 1) % words.length);
		}, delay ?? 10000);
		return () => clearInterval(interval);
	}, []);

	return (
		<motion.span
			className="relative inline-block cursor-pointer overflow-hidden text-justify align-bottom"
			layout
			onClick={() => scrollWord()}
		>
			<AnimatePresence mode="popLayout" initial={false}>
				{sortedWords.map((w, i) => {
					if (index === i) {
						return (
							<motion.span
								layout
								ref={innerref}
								className={cn(
									// font_mono.className,
									`inline-block whitespace-nowrap font-bold ${color}`,
								)}
								key={`${w}-${i}`}
								initial="initial"
								animate="animate"
								exit="exit"
								transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
								variants={variants}
							>
								{w}
							</motion.span>
						);
					}
				})}
			</AnimatePresence>
			{children}
		</motion.span>
	);
});

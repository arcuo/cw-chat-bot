import {
	forwardRef,
	type ReactNode,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { useElementSize } from "../lib/utils";

interface TypeWriterProps {
	sentences: string[];
	opts?: {
		boxFadeDuration?: number;
		letterDelay?: number;
	};
}

const LETTER_DELAY = 0.025; // seconds
const BOX_FADE_DURATION = 0.125; // seconds

export function TypeWriter({ sentences, opts }: TypeWriterProps) {
	const { boxFadeDuration = BOX_FADE_DURATION, letterDelay = LETTER_DELAY } =
		opts ?? {};

	const [sentenceIndex, setSentenceIndex] = useState(0);
	const sentenceRef = useRef<HTMLDivElement>(null);

	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// On spacebar, increment sentenceIndex
		const controller = new AbortController();
		window.addEventListener(
			"keydown",
			(e: KeyboardEvent) => {
				if (e.key === " ") {
					setSentenceIndex((prevIndex) => (prevIndex + 1) % sentences.length);
					setTimeout(
						() =>
							containerRef.current?.scrollTo({
								top: containerRef.current?.scrollHeight,
								behavior: "smooth",
							}),
						50,
					);
				}
			},
			{ signal: controller.signal },
		);
		return () => controller.abort();
	}, [sentences]);

	return (
		<div
			ref={containerRef}
			className="text-xl font-[300] uppercase h-30 overflow-auto leading-none scrollbar-hidden"
		>
			<AnimatePresence>
				{sentences.slice(0, sentenceIndex + 1).map((sentence, si) => (
					<motion.div
						ref={sentenceRef}
						key={si}
						animate={{ opacity: si === sentenceIndex ? 1 : 0.4 }}
						transition={{ duration: 0.3 }}
					>
						{sentence.split("").map((l, i) => (
							<Letter
								key={`${si}-${i}`}
								letter={l}
								letterIndex={i}
								letterDelay={letterDelay}
								boxFadeDuration={boxFadeDuration}
								sentenceRef={sentenceRef}
							/>
						))}
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	);
}



interface LetterProps {
	letter: ReactNode;
	letterIndex: number;
	letterDelay: number;
	boxFadeDuration: number;
	sentenceRef: React.RefObject<HTMLDivElement | null>;
}

const Letter = (props: LetterProps) => {
	const { letter } = props;

	return letter === " " ? <SpaceLetter {...props} /> : <_Letter {...props} />;
};

const _Letter = forwardRef<HTMLDivElement, Omit<LetterProps, "sentenceRef">>(
	({ letter, letterIndex, letterDelay, boxFadeDuration }, ref) => {
		const delay = 0.2 + letterIndex * letterDelay;
		return (
			<motion.span
				className="relative"
				ref={ref}
				layout
				style={{ height: "fit-content" }}
			>
				<motion.span
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						delay: delay,
						duration: boxFadeDuration,
						ease: "easeInOut",
					}}
				>
					{letter}
				</motion.span>
				{/* Writing Box */}
				<motion.span
					initial={{ opacity: 0 }}
					animate={{ opacity: [0, 1, 0] }}
					transition={{
						delay: delay,
						times: [0, 0.1, 1],
						duration: boxFadeDuration,
						ease: "easeInOut",
					}}
					className="inline-block bg-neutral-950 absolute bottom-[5px] left-[1px] right-0 top-[3px]"
				/>
			</motion.span>
		);
	},
);

function SpaceLetter({
	letter,
	letterIndex,
	letterDelay,
	boxFadeDuration,
	sentenceRef,
}: LetterProps & {
	sentenceRef: React.RefObject<HTMLDivElement | null>;
}) {
	const letterRef = useRef<HTMLDivElement>(null);
	// Determine if letter is within right edge of sentence
	const [shouldAddBreak, setShouldAddBreak] = useState(false);

	const handleResize = () => {
		if (letterRef.current && sentenceRef.current) {
			const sentenceRect = sentenceRef.current.getBoundingClientRect();
			const letterRect = letterRef.current.getBoundingClientRect();
			const isWithinRightEdge = letterRect.right > sentenceRect.right - 90;
			setShouldAddBreak(shouldAddBreak || isWithinRightEdge);
		}
	};

	// useElementSize(sentenceRef, handleResize);
	useLayoutEffect(handleResize, [sentenceRef]);

	return (
		<_Letter
			ref={letterRef}
			letter={shouldAddBreak ? <br /> : letter}
			letterIndex={letterIndex}
			letterDelay={letterDelay}
			boxFadeDuration={boxFadeDuration}
		/>
	);
}

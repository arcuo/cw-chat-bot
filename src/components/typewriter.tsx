import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

interface TypeWriterProps {
	sentences: string[];
	opts?: {
		boxFadeDuration?: number;
		letterDelayMs?: number;
	};
}

const LETTER_DELAY = 40; // milliseconds

export function TypeWriter({ sentences, opts }: TypeWriterProps) {
	const { letterDelayMs = LETTER_DELAY } = opts ?? {};

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
	}, []);

	return (
		<div
			ref={containerRef}
			className="text-xl font-[300] uppercase h-30 overflow-auto leading-none scrollbar-hidden flex flex-col gap-2"
		>
			<AnimatePresence>
				{sentences.slice(0, sentenceIndex + 1).map((sentence, si) => (
					<motion.div
						ref={sentenceRef}
						key={si}
						animate={{ opacity: si === sentenceIndex ? 1 : 0.4 }}
						transition={{ duration: 0.3 }}
					>
						<Sentence
							sentence={sentence}
							letterDelayMs={letterDelayMs}
							active={si === sentenceIndex}
							containerRef={containerRef}
						/>
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	);
}

interface SentenceProps {
	sentence: string;
	active?: boolean;
	letterDelayMs?: number;
	containerRef: React.RefObject<HTMLDivElement | null>;
}

const Sentence = (props: SentenceProps) => {
	const { sentence, letterDelayMs = 50, active, containerRef } = props;

	const [letterIndex, setLetterIndex] = useState(0);

	const handleDone = (interval: NodeJS.Timeout) => {
		clearInterval(interval);
		setLetterIndex(sentence.length);
		scrollToBottom();
	};

	const scrollToBottom = () => {
		containerRef.current?.scrollTo({
			top: containerRef.current?.scrollHeight,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setLetterIndex((prevState) => {
				if (prevState >= sentence.length) {
					handleDone(interval);
					return prevState;
				}

				scrollToBottom();
				return prevState + 1;
			});
		}, letterDelayMs);

		const controller = new AbortController();

		window.addEventListener(
			"keydown",
			(e: KeyboardEvent) => {
				if (e.key === " ") {
					handleDone(interval);
				}
			},
			{ signal: controller.signal },
		);

		return () => {
			clearInterval(interval);
			controller.abort();
		};
	}, []);

	return (
		<div className="relative h-full">
			<span>{sentence.slice(0, letterIndex)}</span>
			{active && (
				<motion.span
					className="inline-block h-[18px] w-[10px] bg-neutral-500 ml-1 -mb-[1px]"
					animate={{ opacity: [0, 1, 0] }}
					transition={{
						duration: 0.8,
						times: [0, 0.2, 1],
						repeat: Number.POSITIVE_INFINITY,
					}}
				/>
			)}
		</div>
	);
};

"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSetAtom } from "jotai";
import { showPrompt } from "@/app/page";

interface TypeWriterProps {
	sentences: string[];
	opts?: {
		boxFadeDuration?: number;
		letterDelayMs?: number;
		automated?: boolean;
	};
}

const LETTER_DELAY = 20; // milliseconds

export function TypeWriter({ sentences, opts }: TypeWriterProps) {
	const { letterDelayMs = LETTER_DELAY, automated = false } = opts ?? {};
	const setShowPrompt = useSetAtom(showPrompt);

	const [sentenceIndex, setSentenceIndex] = useState(0);

	const sentenceRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		console.log(sentences.length);
		if (automated) setSentenceIndex(sentences.length);
	}, [automated, sentences]);

	useEffect(() => {
		// On spacebar, increment sentenceIndex
		if (automated) return;

		const controller = new AbortController();
		window.addEventListener(
			"keydown",
			(e: KeyboardEvent) => {
				if (e.key === " ") {
					setSentenceIndex((prevIndex) => {
						if (prevIndex === sentences.length - 1) {
							setShowPrompt(true);
							return prevIndex;
						}
						return prevIndex + 1;
					});
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
		<div className="flex flex-col gap-2">
			<div
				ref={containerRef}
				className="scrollbar-hidden flex h-30 flex-col gap-2 overflow-auto font-[300] text-xl leading-none"
			>
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
			</div>

			{!automated ? (
				<div className="mt-5 text-[.9rem] opacity-40">Press spacebar</div>
			) : null}
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
					controller.abort();
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
					className="-mb-[1px] ml-1 inline-block h-[18px] w-[10px] bg-neutral-500"
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

"use client";
import { Prompt } from "@/components/ui/prompt";
import { TypeWriter } from "@/components/ui/typewriter";
import { atom, useAtomValue } from "jotai";
import { AnimatePresence, motion } from "motion/react";

export const showPrompt = atom(false);

export default function Main() {
	const showPromptValue = useAtomValue(showPrompt);
	return (
		<main>
			<AnimatePresence mode="wait">
				{showPromptValue ? (
					<motion.div
						initial={{ opacity: 0, x: -100 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, type: "spring" }}
						key="prompt"
					>
						<Prompt />
					</motion.div>
				) : (
					<motion.div
						exit={{ opacity: 0, x: 100 }}
						transition={{ duration: 0.2, ease: "easeInOut" }}
						key="intro"
					>
						<TypeWriter
							sentences={[
								"Hey there!",
								"Welcome to my resume!",
								"I'm a developer, which means that I've gone a little overboard and made a chat bot...",
								"Hopefully, you'll find it entertaining and informative as to who I am and what I do.",
								"Feel free to ask me anything about me, my work, or anything else you'd like to know!",
							]}
						/>
						<div className="mt-5 text-[.9rem] opacity-40">Press spacebar</div>
					</motion.div>
				)}
			</AnimatePresence>
		</main>
	);
}

"use client";
import { Prompt } from "@/components/views/prompt";
import { SlideShow } from "@/components/ui/slideShow";
import { Toaster } from "@/components/ui/toaster";
import { TypeWriter } from "@/components/ui/typewriter";
import { atom, useAtomValue } from "jotai";
import { AnimatePresence } from "motion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ResumeForm } from "@/components/views/resumeForm";

const queryClient = new QueryClient();
export const showPrompt = atom(false);

export default function Main() {
	const showPromptValue = useAtomValue(showPrompt);
	return (
		<QueryClientProvider client={queryClient}>
			<main>
				<Toaster />
				<AnimatePresence mode="wait">
					<SlideShow index={showPromptValue ? 1 : 0} direction="left">
						{/* Introduction */}
						<TypeWriter
							sentences={[
								"Hey there!",
								"Welcome to my resume!",
								"I'm a developer, which means that I've gone a little overboard and made a chat bot...",
								"Hopefully, you'll find it entertaining and informative as to who I am and what I do.",
								"Feel free to ask me anything about me, my work, or anything else you'd like to know!",
							]}
						/>
						{/* Prompt */}
						<ResumeForm />
					</SlideShow>
				</AnimatePresence>
			</main>
		</QueryClientProvider>
	);
}

import "./App.css";
import { TypeWriter } from "./components/typewriter";
import WebFont from "webfontloader";
import * as m from "motion/react-client";
import { Textarea } from "./components/textarea";
import { atom, useAtomValue } from "jotai";
import { AnimatePresence, motion } from "motion/react";
import { Prompt } from "./components/prompt";

WebFont.load({
	google: {
		families: ["Roboto Condensed:100,200,300,400,500,600,700,800,900"], // TODO: remove unneeded weights
	},
});

export const showPrompt = atom(false);

function App() {
	const showPromptValue = useAtomValue(showPrompt);

	return (
		<div className="flex h-full flex-col gap-2 px-[20%] py-[20%] text-2xl">
			<m.div
				className="text-[1.2rem]"
				initial={{ opacity: 0, x: -100 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.5 }}
			>
				<span className="font-bold">Hugh Benjamin Zachariae</span> / Software
				Engineer
			</m.div>
			<hr className="mb-5 w-40 border-neutral-700 opacity-20" />

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
		</div>
	);
}

export default App;

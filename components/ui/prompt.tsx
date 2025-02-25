"use client";

import { Fragment, useEffect, useRef } from "react";
import { Button } from "./button";
import { Textarea } from "./textarea";
import { useChat } from "@ai-sdk/react";
import { toast } from "sonner";
import { LayoutGroup, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Kbd } from "./kbd";
import { Loader } from "./loader";

const examplePrompts = [
	"Who are you and where are you from?",
	"What is your work experience?",
	"Which programming languages do you know?",
	"Do you have experience with [programming language]?",
	"How do you stay up to date with the latest technologies?",
	"We are a [description] company, what kind of experience would you bring to us specifically?",
];

export function Prompt() {
	const {
		messages,
		input,
		handleInputChange,
		handleSubmit,
		setInput,
		error,
		status,
	} = useChat({
		experimental_throttle: 20,
	});

	const formRef = useRef<HTMLFormElement>(null);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (error) {
			toast.error(error?.message, {
				action: {
					label: "Close",
					onClick: () => {},
				},
			});
		}
	}, [error]);

	return (
		<div className="flex flex-col gap-2">
			{messages.length ? (
				<>
					<motion.div
						layout
						className={"flex flex-col gap-3 font-[300] text-sm leading-none"}
					>
						{messages.map((m, i) => {
							return (
								<motion.div
									layout
									className={cn(
										"relative h-fit w-fit max-w-[80%] rounded-lg rounded-tl-none border border-neutral-400 p-3 font-extralight text-[1rem] shadow-sm",
										{
											"self-end rounded-tl-lg rounded-br-none font-light":
												m.role === "assistant",
										},
									)}
									key={m.id}
									transition={{ duration: 0.4, ease: "easeOut" }}
								>
									{i === messages.length - 1 && status === "streaming" ? (
										<Loader className="h-4" />
									) : (
										<motion.span
											key={`${m.id}-inner`}
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											transition={{
												delay: 0.2,
												duration: 0.2,
												ease: "easeInOut",
											}}
										>
											{m.content}
										</motion.span>
									)}
								</motion.div>
							);
						})}
					</motion.div>
					<hr className="my-5 w-40 border-neutral-700 opacity-20" />
				</>
			) : null}

			<form
				ref={formRef}
				onSubmit={handleSubmit}
				className="flex flex-col gap-2"
			>
				<label
					htmlFor="main-prompt-textarea"
					className="mt-5 text-neutral-600 text-sm"
				>
					<span className="sr-only">Main prompt. </span>Ask me any questions
					about me, my work, or anything else you'd like to know!
				</label>
				<Textarea
					id="main-prompt-textarea"
					ref={textareaRef}
					className="w-[100%]"
					placeholder="Type your question here..."
					value={input}
					onChange={handleInputChange}
					onKeyDown={(e) => {
						if (e.ctrlKey && e.key === "Enter" && formRef.current) {
							e.preventDefault();
							formRef.current.requestSubmit();
						}
					}}
					disabled={status !== "ready"}
				/>
				<div className="flex items-center justify-end gap-2">
					<Kbd className="opacity-30">Ctrl + Enter</Kbd>
					<Button
						type="submit"
						disabled={status === "streaming"}
						loading={status === "streaming"}
					>
						{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
						<svg
							width="15"
							height="15"
							viewBox="0 0 15 15"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M1.20308 1.04312C1.00481 0.954998 0.772341 1.0048 0.627577 1.16641C0.482813 1.32802 0.458794 1.56455 0.568117 1.75196L3.92115 7.50002L0.568117 13.2481C0.458794 13.4355 0.482813 13.672 0.627577 13.8336C0.772341 13.9952 1.00481 14.045 1.20308 13.9569L14.7031 7.95693C14.8836 7.87668 15 7.69762 15 7.50002C15 7.30243 14.8836 7.12337 14.7031 7.04312L1.20308 1.04312ZM4.84553 7.10002L2.21234 2.586L13.2689 7.50002L2.21234 12.414L4.84552 7.90002H9C9.22092 7.90002 9.4 7.72094 9.4 7.50002C9.4 7.27911 9.22092 7.10002 9 7.10002H4.84553Z"
								fill="currentColor"
							/>
						</svg>
					</Button>
				</div>
			</form>
			<div className="mt-5 text-neutral-500 text-xs">Example queries</div>
			<div className="flex flex-wrap gap-2">
				{examplePrompts.map((prompt) => {
					return (
						<Button
							key={prompt}
							onClick={(e) => {
								e.preventDefault();
								if (isSchematic(prompt)) {
									const newInput = `${input}${input ? "\n" : ""}${prompt}`;
									const start = newInput.indexOf("[");
									const end = newInput.indexOf("]") - 1;

									// Find schematic and remove square brackets
									setInput(newInput.replace(/\[(.*?)\]/g, "$1"));

									// Move cursor to the end of the schematic
									if (textareaRef.current) {
										textareaRef.current.focus();
										setTimeout(() => {
											textareaRef.current?.setSelectionRange(start, end);
										}, 0);
									}
								} else {
									setInput((prev) => `${prev}${prev ? "\n" : ""}${prompt}`);
									textareaRef.current?.focus();
								}
							}}
						>
							<ExamplePromptText prompt={prompt} />
						</Button>
					);
				})}
			</div>
		</div>
	);
}

const isSchematic = (prompt: string) => {
	return prompt.match(/\[(.*?)\]/g);
};

/** Find schematics like "[description]" and replace them with Kbd */
const ExamplePromptText = ({ prompt }: { prompt: string }) => {
	if (!isSchematic(prompt)) return <span>{prompt}</span>;

	const splitPrompt = prompt.split(/\[(.*?)\]/g);

	return (
		<span className="align-middle">
			{splitPrompt.map((part, i) => {
				const key = `${prompt}-schematic-${i}`;
				if (i % 2 === 0) return <span key={key}>{part}</span>;
				return (
					<Fragment key={key}>
						<Kbd className="m-0">{part}</Kbd>{" "}
					</Fragment>
				);
			})}
		</span>
	);
};

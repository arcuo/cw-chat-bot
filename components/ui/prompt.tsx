"use client";

import { useEffect } from "react";
import { Button } from "./button";
import { Textarea } from "./textarea";
import { useChat } from "@ai-sdk/react";
import { toast } from "sonner";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const examplePrompts = [
	"Who are you and where are you from?",
	"What is your work experience?",
	"Which programming languages do you know?",
	"What is your favorite programming language?",
	"How do you stay up to date with the latest technologies?",
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
					<div className=" flex flex-col gap-2 font-[300] text-xl leading-none">
						{messages.map((m, i) => {
							return (
								<div
									className={cn("relative h-full max-w-[80%]", {
										"self-end text-neutral-500": m.role === "user",
									})}
									key={m.id}
								>
									<span>
										{m.content.split("").map((l, li) => {
											return (
												<span key={`${m.id}-${li}`}>
													<span>{l}</span>
													<motion.span
														className="-mb-[1px] ml-1 inline-block h-[18px] w-[10px] bg-neutral-500"
														animate={{ opacity: [0, 1] }}
														transition={{
															duration: 0.8,
															times: [0, 0.2, 1],
															repeat: Number.POSITIVE_INFINITY,
														}}
													/>
												</span>
											);
										})}
									</span>
								</div>
							);
						})}
					</div>
					<hr className="my-5 w-40 border-neutral-700 opacity-20" />
				</>
			) : null}

			{/* <label htmlFor="visitor-textarea" className="text-neutral-600 text-sm">
				<strong>Visitor description</strong>. Tailor the the response to who you
				are and what you want to know!
			</label>
			<Textarea
				id="visitor-textarea"
				className="w-[100%]"
				placeholder="Describe who you are"
			/> */}
			<form onSubmit={handleSubmit} className="flex flex-col gap-2">
				<label
					htmlFor="main-prompt-textarea"
					className="mt-5 text-neutral-600 text-sm"
				>
					<span className="sr-only">Main prompt. </span>Ask me any questions
					about me, my work, or anything else you'd like to know!
				</label>
				<Textarea
					id="main-prompt-textarea"
					className="w-[100%]"
					placeholder="Type your question here..."
					value={input}
					onChange={handleInputChange}
					disabled={status !== "ready"}
				/>
				<div className="flex justify-end">
					<Button type="submit" disabled={status !== "ready"}>
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
								fill-rule="evenodd"
								clip-rule="evenodd"
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
							onClick={() =>
								setInput((prev) => `${prev}${prev ? "\n" : ""}${prompt}`)
							}
						>
							{prompt}
						</Button>
					);
				})}
			</div>
		</div>
	);
}

"use client";

import { useState } from "react";
import { Button } from "./button";
import { Textarea } from "./textarea";
import { useChat } from "@ai-sdk/react";

const examplePrompts = [
	"Who are you and where are you from?",
	"What is your work experience?",
	"Which programming languages do you know?",
	"What is your favorite programming language?",
	"How do you stay up to date with the latest technologies?",
];

export function Prompt() {
	const [mainTextareaValue, setMainTextareaValue] = useState("");
	const { messages, input, handleInputChange, handleSubmit } = useChat();

	return (
		<div className="flex flex-col gap-2">
			<label htmlFor="visitor-textarea" className="text-neutral-600 text-sm">
				<strong>Visitor description</strong>. Tailor the the response to who you
				are and what you want to know!
			</label>
			<Textarea
				id="visitor-textarea"
				className="w-[100%]"
				placeholder="Describe who you are"
			/>
			<label
				htmlFor="main-prompt-textarea"
				className="mt-5 text-neutral-600 text-sm"
			>
				<strong>Main prompt</strong>. Ask me any questions about me, my work, or
				anything else you'd like to know!
			</label>
			<Textarea
				id="main-prompt-textarea"
				className="w-[100%]"
				placeholder="Type your question here..."
				value={mainTextareaValue}
				onChange={(e) => setMainTextareaValue(e.target.value)}
			/>
			<div className="flex justify-end">
				<Button>
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
			<div className="mt-5 text-neutral-500 text-xs">Example queries</div>
			<div className="flex flex-wrap gap-2">
				{examplePrompts.map((prompt) => {
					return (
						<Button
							key={prompt}
							onClick={() =>
								setMainTextareaValue(
									(prev) => `${prev}${prev ? "\n" : ""}${prompt}`,
								)
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

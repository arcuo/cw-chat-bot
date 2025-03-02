"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Textarea } from "../ui/textarea";
import { ResumeRequestSchema } from "@/lib/schemas/resume";
import { Button } from "../ui/button";
import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const ResumeForm = () => {
	const qc = useQueryClient();
	const [mkdown, setMkdown] = useState(`# header

		## Subheader
A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |`);

	const { mutate, status, error } = useMutation({
		mutationFn: async (req: Zod.infer<typeof ResumeRequestSchema>) => {
			return fetch("/api/resume/create", {
				method: "POST",
				body: JSON.stringify(req),
				headers: {
					"Content-Type": "application/json",
				},
			}).then((res) => res.json() as unknown as { hash: string; text: string });
		},
		onError: (error) => {
			console.error(error);
		},
		onSuccess: ({ hash, text }) => {
			// Preload
			qc.setQueryData(["resume", hash], text);
			setMkdown(text);
		},
	});

	const form = useForm({
		defaultValues: {
			userInfo: "",
			userQuery: undefined,
		} as Zod.infer<typeof ResumeRequestSchema>,
		validators: {
			onChange: ResumeRequestSchema,
		},
		onSubmit: ({ value }) => {
			mutate(value);
		},
	});

	return (
		<>
			{mkdown && (
				<div className="text-sm">
					<Markdown remarkPlugins={[remarkGfm]}>{mkdown}</Markdown>
				</div>
			)}
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
				onKeyDown={(e) => {
					if (e.ctrlKey && e.key === "Enter") {
						e.preventDefault();
						e.currentTarget?.requestSubmit();
					}
				}}
				className="flex flex-col gap-4"
			>
				<form.Field
					name="userInfo"
					// biome-ignore lint/correctness/noChildrenProp: needed for @tanstack/react-form
					children={(field) => (
						<div className="flex flex-col gap-2">
							<label htmlFor={field.name} className="text-neutral-600 text-sm">
								Who are you?
							</label>
							<Textarea
								id={field.name}
								className="w-[100%]"
								placeholder="We are a web development company..."
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
								onBlur={field.handleBlur}
								disabled={field.state.meta.isValidating || status === "pending"}
							/>
							{field.state.meta.errors ? (
								<span className="text-red-500 text-sm">
									{field.state.meta.errors.map((e) => e?.message).join(", ")}
								</span>
							) : null}
						</div>
					)}
				/>

				<form.Field
					name="userQuery"
					// biome-ignore lint/correctness/noChildrenProp: needed for @tanstack/react-form
					children={(field) => (
						<div className="flex flex-col gap-2">
							<label htmlFor={field.name} className="text-neutral-600 text-sm">
								What do you want to know?
							</label>
							<Textarea
								id={field.name}
								className="w-[100%]"
								placeholder="We are looking for a developer with experience in Rust and TypeScript"
								value={field.state.value ?? ""}
								onChange={(e) => field.handleChange(e.target.value)}
								onBlur={field.handleBlur}
								disabled={field.state.meta.isValidating || status === "pending"}
							/>
							{field.state.meta.errors ? (
								<span className="text-red-500 text-sm">
									{field.state.meta.errors.map((e) => e?.message).join(", ")}
								</span>
							) : null}
						</div>
					)}
				/>
				<Button
					type="submit"
					loading={status === "pending"}
					disabled={status === "pending"}
				>
					Submit
				</Button>
			</form>
		</>
	);
};

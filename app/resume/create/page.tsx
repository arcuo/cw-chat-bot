"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import { createResume } from "../resumeAction";
import { useRouter } from "next/navigation";

// TODO: Add premade resumes for Tech lead, Frontender, Full stack. Should link to premade resumes in the database.

export default function Test() {
	const router = useRouter();

	const form = useForm({
		defaultValues: {
			prompt: "I want to build a chatbot",
		},
		onSubmit: async ({ value }) => {
			const { id } = await createResume(value);
			router.push(`/resume/${id}`);
		},
	});

	return (
		<div className="flex flex-col gap-4">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
				className="flex flex-col gap-4"
			>
				<form.Field
					name="prompt"
					validators={{
						onBlur: ({ value }) =>
							value.length < 12 && "Prompt must be at least 12 characters",
					}}
				>
					{(field) => {
						return (
							<div>
								<Textarea
									name={field.name}
									value={field.state.value}
									onChange={(e) => field.handleChange(e.currentTarget.value)}
								/>
								{field.state.meta.errors.map((error) => (
									<p key={error as unknown as string}>{error}</p>
								))}
							</div>
						);
					}}
				</form.Field>

				<form.Subscribe
					selector={(formState) => [
						formState.canSubmit,
						formState.isSubmitting,
					]}
				>
					{([canSubmit, isSubmitting]) => (
						<Button type="submit" disabled={!canSubmit}>
							{isSubmitting ? "..." : "Submit"}
						</Button>
					)}
				</form.Subscribe>
			</form>
		</div>
	);
}

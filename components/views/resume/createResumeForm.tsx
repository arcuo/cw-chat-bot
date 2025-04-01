"use client";

import { useForm } from "@tanstack/react-form";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";
import { createResume } from "@/app/resume/resumeAction";
import { BanIcon, PartyPopperIcon, PencilIcon, RocketIcon } from "lucide-react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useState, type ComponentProps, type PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export function CreateResumeForm() {
	const [state, setState] = useState<number>(0);
	const router = useRouter();

	const form = useForm({
		defaultValues: {
			prompt: "",
		},
		onSubmit: async ({ value }) => {
			if (form.state.isSubmitted) return;
			const { hash } = await createResume(value);
			router.push(`/resume/${hash}`);
		},
	});

	return (
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
					onChange: ({ value }) =>
						value.length < 12 && "Prompt must be at least 12 characters",
				}}
			>
				{(field) => {
					return (
						<div className="relative">
							<Textarea
								name={field.name}
								placeholder="I'm looking for a developer with experience in..."
								value={field.state.value}
								onKeyDown={(e) => {
									if (e.key === "Enter" && !e.shiftKey && e.ctrlKey) {
										e.preventDefault();
										form.handleSubmit();
									}
								}}
								onChange={(e) => {
									field.handleChange(e.currentTarget.value);
								}}
								className="h-[100px]"
							/>
							{field.state.meta.errors.map((error) => (
								<div
									className="-bottom-10 absolute right-0 text-red-700 text-sm"
									key={error as unknown as string}
								>
									{error}
								</div>
							))}
						</div>
					);
				}}
			</form.Field>

			<div>
				<form.Subscribe
					selector={(formState) => [
						formState.canSubmit,
						formState.isSubmitting,
						formState.isSubmitted,
						formState.isValid,
					]}
				>
					{([canSubmit, isSubmitting, isSubmitted, isValid]) => (
						<Button
							type="submit"
							className="overflow-hidden"
							disabled={!canSubmit || isSubmitting || isSubmitted}
							onClick={() => setState((state + 1) % 4)}
						>
							<AnimatePresence initial={false} mode="wait">
								{!isValid && (
									<ButtonContent key="error">
										Something is wrong
										<BanIcon className="size-4" />
									</ButtonContent>
								)}

								{canSubmit && !isSubmitted && (
									<ButtonContent key="editing">
										Tailor my resume!
										<RocketIcon className="size-4" />
									</ButtonContent>
								)}

								{isSubmitting && (
									<ButtonContent key="isSubmitting">
										Generating...
										<PencilIcon className="size-4" />
									</ButtonContent>
								)}

								{isSubmitted && (
									<ButtonContent key="isSubmitted">
										Generated!
										<PartyPopperIcon className="size-4" />
									</ButtonContent>
								)}
							</AnimatePresence>
						</Button>
					)}
				</form.Subscribe>
				<kbd className="-me-1 ms-3 inline-flex h-5 max-h-full items-center rounded border border-neutral-500 px-1 font-[inherit] text-xs opacity-60">
					Ctrl + Enter
				</kbd>
			</div>
		</form>
	);
}

const ButtonContent = ({
	children,
	className,
	...rest
}: ComponentProps<typeof motion.div>) => {
	return (
		<motion.div
			initial="initial"
			animate="enter"
			exit="exit"
			variants={variants}
			className={cn("flex items-center gap-2", className)}
			{...rest}
		>
			{children}
		</motion.div>
	);
};

const variants: Variants = {
	initial: {
		y: 100,
		transition: {
			duration: 0.2,
		},
	},
	exit: {
		opacity: 0,
		transition: {
			duration: 0.1,
		},
	},
	enter: {
		y: 0,
		transition: {
			duration: 0.3,
		},
	},
};

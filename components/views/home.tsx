"use client";

import { cn } from "@/lib/utils";
import { LayoutGroup, motion } from "motion/react";
import { useRef, type ComponentRef } from "react";
import { LinkButton } from "../ui/button";
import { ScrollingWord } from "../ui/scrollingWord";
import { comforta } from "../utils/fonts";
import { CreateResumeForm } from "./resume/createResumeForm";
import type { getBaseResumes } from "@/app/resume/resumeAction";
import { Main } from "./main";
import { Tooltip } from "../ui/tooltip";
import { NewspaperIcon } from "lucide-react";

export const Home = ({
	premadeResumes,
}: { premadeResumes: Awaited<ReturnType<typeof getBaseResumes>> }) => {
	const scroll1Ref = useRef<ComponentRef<typeof ScrollingWord>>(null);
	return (
		<div className="grid grid-cols-[auto_300px] gap-10 max-lg:grid-cols-1">
			<Main className="flex flex-col gap-8">
				<LayoutGroup>
					<h1
						className={cn(
							comforta.className,
							"col-span-2 w-[70%] select-none font-bold text-5xl leading-18 max-sm:w-full max-sm:text-4xl max-sm:leading-10",
						)}
					>
						<motion.p
							layout="size"
							className="relative w-fit cursor-pointer "
							role="button"
							onClick={() => scroll1Ref.current?.scrollWord()}
						>
							<motion.span layout>Hi! I'm Benjamin. I'm a </motion.span>{" "}
							<ScrollingWord
								ref={scroll1Ref}
								active
								words={[
									"Software",
									"Frontend",
									"DevEx",
									"Senior",
									"Full Stack",
								]}
							/>{" "}
							<motion.span layout>Developer</motion.span>
							<span className="-top-5 -left-2 absolute ml-2 text-neutral-500 text-sm italic">
								Click me!
							</span>
						</motion.p>
						<p className="mt-5 text-4xl max-lg:text-3xl">
							I use my experience in software development to build web
							applications
						</p>
					</h1>
				</LayoutGroup>

				<div className="flex w-[min(800px,100%)] flex-col gap-4">
					<p>
						I may have gotten a little carried away and built a resume generator
						to tailor one specifically for you! Tell me what you're looking for
						in a developer, and let's make some magic happen. Sorry{" "}
						<span className="text-amber-900">(not sorry)</span> for going
						overboard!
					</p>

					<CreateResumeForm />
				</div>

				<div>
					<p className="mb-2">
						Don't want to write something? Checkout these premade resumes. Hover
						over the resume to see the prompt.
					</p>
					<div className="flex flex-wrap justify-start gap-2">
						{premadeResumes.map(({ hash, title, prompt }) => (
							<Tooltip
								key={hash}
								content={prompt ?? "No prompt"}
								className="text-balance p-3 text-left"
							>
								<LinkButton className="text-sm" href={`/resume/${hash}`}>
									{title}
								</LinkButton>
							</Tooltip>
						))}
					</div>
				</div>

				<div className="flex items-center gap-5">
					<span>
						If you're not a big fan of AI, you can check out my static resume
						instead.
					</span>
					<LinkButton href={"/resume"}>
						<NewspaperIcon className="size-5" />
					</LinkButton>
				</div>
			</Main>
		</div>
	);
};

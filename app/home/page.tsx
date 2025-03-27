"use client";

import { LayoutGroup, motion } from "motion/react";
import { ScrollingWord } from "@/components/ui/scrollingWord";
import { useRef, type ComponentRef } from "react";
import { comforta } from "@/components/utils/fonts";
import { cn } from "@/lib/utils";
import { Main } from "@/components/views/main";
import { CreateResumeForm } from "@/components/views/resume/createResumeForm";
import Link from "next/link";

export default function Home() {
	const scroll1Ref = useRef<ComponentRef<typeof ScrollingWord>>(null);
	return (
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
							words={["Software", "Frontend", "DevEx", "Senior", "Full Stack"]}
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
					to tailor one specifically for you! Tell me what you're looking for in
					a developer, and let's make some magic happen. Sorry{" "}
					<span className="text-amber-900">(not sorry)</span> for going
					overboard!
				</p>

				<CreateResumeForm />
			</div>

			<div>
				<p>
					If you're not a big fan of AI, you can check out my{" "}
					<Link href={"/resume"} className="regular-link">
						resume
					</Link>{" "}
					instead.
				</p>
			</div>
		</Main>
	);
}

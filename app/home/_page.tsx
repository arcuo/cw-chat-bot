"use client";

import { LayoutGroup, motion } from "motion/react";
import { EmailCopy } from "@/components/ui/emailCopy";
import { LinkButton } from "@/components/ui/button";
import {
	PageTranstionWrapper,
	type PageTransitionVariants,
} from "@/components/ui/pageTransitionWrapper";
import { ScrollingWord } from "@/components/ui/scrollingWord";

export default function Home() {
	return (
		<PageTranstionWrapper className="flex flex-col gap-7">
			<motion.h1
				className="col-span-2 w-[90%] text-balance font-bold text-6xl leading-18"
				layout
			>
				<p>
					<ScrollingWord words={["Adaptable", "Versatile", "Effective"]} />{" "}
					Software Developer
				</p>
				<p>
					Developing{" "}
					<ScrollingWord words={["accessible", "responsive", "performant"]} />{" "}
					web applications
				</p>
			</motion.h1>
			<div className="ml-7 w-[60%] text-balance text-xl max-xl:ml-0 max-xl:w-[90%] [&>p]:mb-5">
				<p>
					I am a skilled developer with over 8 years of programming experience
					in Frontend development and Frontend Technical Leading. I have
					developed funky animated designs as well as professional{" "}
					<span className="text-amber-700">WCAG</span> compliant software being
					used by organisations around the world.
				</p>
				<p>
					I am a social and team-oriented person and I work to develop great
					customer and developer experience. I am a great collaborator and
					leader.
				</p>
				<p>
					I invite you to build your own tailored resume using{" "}
					<span className="text-amber-700">AI (RAG)</span>{" "}
					<LinkButton
						href="/experience"
						className="ml-2 inline-block px-2 py-[1px]"
					>
						Fancy AI experience!
					</LinkButton>
				</p>
				<p className="text-neutral-500">
					... or if AI is not your thing, check out{" "}
					<LinkButton
						href="/resume"
						className="ml-2 inline-block px-2 py-[1px]"
					>
						less fancy, but still pretty neat resume
					</LinkButton>
				</p>
			</div>

			{/* <motion.div
				variants={rightSideVariants}
				transition={{ delay: 1.5 }}
				className="fixed right-[10%] bottom-[10%] flex size-[600px] items-center justify-center max-xl:relative max-xl:right-0 max-xl:bottom-0"
			>
				<View
					className="flex h-96 w-full flex-col items-center justify-center"
					orbit
				>
					<Suspense fallback={<Loader />}>
						<Bear scale={1.5} position={[0, -1, 0]} />
					</Suspense>
					<Common />
				</View>
			</motion.div> */}

			<motion.address
				variants={rightSideVariants}
				transition={{ delay: 1 }}
				className="fixed right-[2.5%] bottom-[5%] tracking-[4px]"
			>
				<EmailCopy className="[writing-mode:vertical-rl]" />
			</motion.address>
		</PageTranstionWrapper>
	);
}

const rightSideVariants: PageTransitionVariants = {
	hidden: { x: 20, opacity: 0 },
	shown: { x: 0, opacity: 1 },
};

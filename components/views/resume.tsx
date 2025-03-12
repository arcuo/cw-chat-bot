"use client";
import { skills } from "@/lib/data/skills";
import { SkillCard } from "./skill";
import { LayoutGroup, motion } from "motion/react";
import { HorizontalView } from "../ui/horizontalView";
import { ScrollingWord } from "../ui/scrollingWord";
import { useRef, type ComponentRef } from "react";
import { ProjectCard } from "./project";
import { projects } from "@/lib/data/projects";
import { Timeline, TimelineEntryDialog } from "@/components/ui/timeline";
import { education, workExperience } from "@/lib/data/timeline";
import { FeatureTag } from "../ui/featureTag";
import { DataCard } from "../ui/dataCard";

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type ResumeViewProps = {};

export const ResumeView = () => {
	const scroll1Ref = useRef<ComponentRef<typeof ScrollingWord>>(null);
	const scroll2Ref = useRef<ComponentRef<typeof ScrollingWord>>(null);
	return (
		<div className="[&_h2]:mt-5 [&_h2]:text-xl [&_p]:max-w-[1000px]">
			<LayoutGroup>
				<h1 className="col-span-2 w-[70%] text-balance font-bold text-6xl leading-18 max-sm:w-full max-sm:text-4xl max-sm:leading-10">
					<motion.p
						layout
						className="relative w-fit cursor-pointer whitespace-nowrap max-sm:whitespace-pre-wrap"
						role="button"
						onClick={() => scroll1Ref.current?.scrollWord()}
					>
						<ScrollingWord
							ref={scroll1Ref}
							active
							words={["Software", "Frontend", "Developer Experience", "Senior"]}
						/>{" "}
						<motion.span layout>Developer</motion.span>
						<span className="absolute ml-2 text-neutral-500 text-sm italic">
							Click me!
						</span>
					</motion.p>
					<motion.p
						layout
						className="w-fit cursor-pointer whitespace-nowrap max-xl:whitespace-pre-wrap"
						role="button"
						onClick={() => scroll2Ref.current?.scrollWord()}
					>
						<motion.span layout>Creating</motion.span>{" "}
						<ScrollingWord
							color="text-sky-700"
							ref={scroll2Ref}
							active
							words={[
								"beautiful",
								"WCAG accessible",
								"responsive",
								"performant",
								"funky animated",
							]}
						/>{" "}
						<motion.span layout>software for the web</motion.span>
					</motion.p>
				</h1>
			</LayoutGroup>

			{/* Introduction or cover letter */}
			<p className="my-9 text-lg">
				With over 8 years of experience in EdTech, I specialize in frontend
				development, including 1.5 years as a Frontend Tech Lead. I am a
				passionate problem solver and a dedicated learner, driven by a curiosity
				for modern IT technologies.
			</p>

			{/* Skills */}
			<h2 className="my-2 font-bold">Technical skills</h2>
			<p>
				Frontend, Backend, Devevloper Experience, Multi-Party Computation,{" "}
				<strong>Post-Quantum Secure Signature Protocols!</strong>. You name it,
				I've probably done it! I've developed projects in several aspects of IT,
				Frontend, Backend, and Data analysis.
			</p>

			<HorizontalView active>
				{Object.values(skills).map((skill) => (
					<SkillCard key={skill.title} skill={skill} />
				))}
			</HorizontalView>

			{/* Timeline non-mobile */}
			<div className="contents max-md:hidden">
				<h2 className="my-2 font-bold">Experiences and Education</h2>
				<p>
					Below is a timeline of my work and education. My education is varied
					as I have studied in both Cognitive Science (a humanities based field)
					and Computer Science. This gives me a broad range of skills and
					knowledge that I can apply to various projects.
				</p>

				<div className="my-10">
					<Timeline
						min={2014}
						max={2025}
						rows={[
							{ heading: "Work", entries: workExperience },
							{ heading: "Education", entries: education },
						]}
					/>
				</div>
			</div>

			{/* Timeline mobile */}
			{/* TODO: Add timeline mobile */}
			{/* <div className="contents md:hidden">
				<h2 className="my-2 font-bold">Work experiences</h2>
				<HorizontalView active>
					{Object.values(workExperience).map((we, i) => (
						<TimelineEntryDialog
							key={`work-experience-${i}`}
							entry={we}
							trigger={
								<div className="flex items-center gap-2 text-sm">
									<span className="font-bold">{we.title}</span>
									<span className="text-neutral-500 text-xs">
										{we.subtitle}
									</span>
								</div>
							}
						/>
					))}
				</HorizontalView>
			</div> */}

			{/* Projects */}
			<h2 className="my-2 font-bold">Notable Projects</h2>
			<p>
				In my professional and personal life, I've worked on a variety of
				projects. They vary much in their technical scope, Backend, Frontend,
				DevEx, Scripts, Cryptography, etc.
			</p>

			<HorizontalView active>
				{Object.values(projects).map((project) => (
					<ProjectCard key={project.title} project={project} />
				))}
			</HorizontalView>

			{/* Features */}
			<div className="my-5 flex w-fit flex-wrap items-center gap-3">
				<span className="font-bold">Features</span>
				<FeatureTag
					title="WCAG AA"
					description={
						<>
							This page is fully WCAG AA compliant in accessibility. If you're
							interested, checkout the{" "}
							<a
								href="https://www.deque.com/axe/devtools/"
								target="_blank"
								className="regular-link"
								rel="noreferrer"
							>
								Axe DevTools
							</a>{" "}
							for a report of the accessibility of this page. Much of the
							accessibility is ensured through the use of{" "}
							<a
								href="https://radix-ui.com"
								target="_blank"
								className="regular-link"
								rel="noreferrer"
							>
								Radix UI
							</a>
							.
						</>
					}
				/>
				<FeatureTag
					title="Responsive"
					description="Developed to be responsive for both desktop and mobile."
				/>
				<FeatureTag
					title="Framer Motion"
					description={
						<>
							Animations are built with{" "}
							<a
								href="https://www.framer.com/motion/"
								target="_blank"
								className="regular-link"
								rel="noreferrer"
							>
								Framer Motion
							</a>
						</>
					}
				/>
				<FeatureTag
					title="Tailwind CSS"
					description={
						<>
							Built with{" "}
							<a
								className="regular-link"
								href="https://tailwindcss.com/"
								target="_blank"
								rel="noreferrer"
							>
								Tailwind CSS
							</a>
						</>
					}
				/>
				<FeatureTag
					title="Typescript"
					description="Written with typesafe code in TypeScript."
				/>
				<FeatureTag
					title="AI/RAG tailored resume"
					description={
						<>
							You can tailor the resume to the job you're listing or what you're
							interested in! I've developed a system using{" "}
							<a
								href="https://gemini.google.com/app"
								target="_blank"
								className="regular-link"
								rel="noreferrer"
							>
								Gemini
							</a>{" "}
							and{" "}
							<a
								href="https://sdk.vercel.ai/docs/introduction"
								target="_blank"
								className="regular-link"
								rel="noreferrer"
							>
								Vercel AI SDK
							</a>{" "}
							to allow you to chat with agents (RAG) that tailor the resume to
							be more streamlined to your needs!
						</>
					}
					todo
				/>
				<FeatureTag
					title="PostgreSQL"
					description={
						<>
							Taking advantage of{" "}
							<pre className="inline font-bold">pgvector</pre> for storing
							embeddings on the information available on the page, AI agents can
							grasp the information that you want to know about "me". Ideally,
							this will be done using the{" "}
							<a
								className="regular-link"
								href="https://neon.tech/"
								target="_blank"
								rel="noreferrer"
							>
								Neon Serverless Postgres
							</a>
						</>
					}
					todo
				/>
			</div>
		</div>
	);
};

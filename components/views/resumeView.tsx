"use client";
import { skills as staticSkills, type Skill } from "@/lib/data/skills";
import { SkillCard } from "./skill";
import { LayoutGroup, motion } from "motion/react";
import { HorizontalView } from "../ui/horizontalView";
import { ScrollingWord } from "../ui/scrollingWord";
import { useRef, type ComponentRef } from "react";
import { ProjectCard } from "./project";
import { projects as staticProjects, type Project } from "@/lib/data/projects";
import { Timeline } from "@/components/ui/timeline";
import { education, workExperience } from "@/lib/data/timeline";
import { FeatureTag } from "../ui/featureTag";
import type { getResume } from "@/app/resume/resumeAction";
import { NetworkIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Popup } from "../ui/popup";

export type ResumeViewProps = {
	resume?: Awaited<ReturnType<typeof getResume>>;
};

export const ResumeView = ({ resume }: ResumeViewProps) => {
	const scroll1Ref = useRef<ComponentRef<typeof ScrollingWord>>(null);
	const scroll2Ref = useRef<ComponentRef<typeof ScrollingWord>>(null);

	const skills = resume?.skills ?? (Object.values(staticSkills) as Skill[]);
	const projects =
		resume?.projects ?? (Object.values(staticProjects) as Project[]);

	return (
		<>
			<h1 className="col-span-2 w-[70%] select-none text-balance font-bold text-6xl leading-18 max-sm:w-full max-sm:text-4xl max-sm:leading-10">
				<LayoutGroup>
					<motion.p
						layout
						className="relative w-fit cursor-pointer whitespace-nowrap max-sm:whitespace-pre-wrap"
						role="button"
						onClick={() => scroll1Ref.current?.scrollWord()}
					>
						<motion.span>Hi! I'm a</motion.span>{" "}
						<ScrollingWord
							ref={scroll1Ref}
							active
							words={
								resume?.title.words ?? [
									"Software",
									"Frontend",
									"DevEx",
									"Senior",
									"Full Stack",
								]
							}
						/>{" "}
						<motion.span>Developer</motion.span>
						<span className="absolute ml-2 text-neutral-500 text-sm italic">
							Click me!
						</span>
					</motion.p>
				</LayoutGroup>

				<LayoutGroup>
					<motion.p
						layout
						className="w-fit cursor-pointer whitespace-nowrap max-xl:whitespace-pre-wrap"
						role="button"
						onClick={() => scroll2Ref.current?.scrollWord()}
					>
						<motion.span>
							{resume?.title.subtitle.prefix ?? "Building"}
						</motion.span>{" "}
						<ScrollingWord
							color="text-sky-700"
							ref={scroll2Ref}
							active
							words={
								resume?.title.subtitle.words ?? [
									"beautiful",
									"WCAG accessible",
									"responsive",
									"performant",
									"funky animated",
								]
							}
						/>{" "}
						<motion.span>
							{resume?.title.subtitle.suffix ?? "software for the web"}
						</motion.span>
					</motion.p>
				</LayoutGroup>
			</h1>

			{/* Prompt information */}
			{resume && (
				<p className="my-9 text-neutral-600 text-sm">
					<NetworkIcon className="mr-2 inline size-4" />
					<span>This resume was generated using AI and tailored to a</span>{" "}
					<Popup
						content={
							<div>
								<div className="font-bold">Prompt:</div>
								<blockquote className="my-2 ml-3 text-md">“{resume.prompt}”</blockquote>
							</div>
						}
					>
						<button
							type="button"
							className="cursor-pointer underline hover:text-neutral-800 data-[state=open]:text-neutral-900"
						>
							prompt
						</button>
					</Popup>
					.
				</p>
			)}

			<div className="contents [&_h2]:mt-5 [&_h2]:text-xl [&_p]:max-w-[1000px]">
				{/* Introduction or cover letter */}
				<p className="my-9 text-xl">
					{resume?.cover ??
						"Dynamic Software Developer with 8 years of experience in Frontend and Backend development, including 1.5 years leading a Frontend community. Driven by a passion for innovation and a commitment to lifelong learning, I'm constantly seeking opportunities to leverage cutting-edge technologies."}
				</p>

				{/* Skills */}
				<h2 className="my-2 font-bold">Technical skills</h2>
				<p>
					I'm a versatile Developer with experience across the full software
					spectrum, from crafting Single-Page Applications and paginated backend
					REST solutions to exploring Bayesian data analytics and Post-Quantum
					Secure Signature Protocols. I thrive on tackling diverse challenges
					and delivering innovative solutions across Frontend, Backend, and Data
					Analysis domains.
				</p>

				<HorizontalView active>
					{skills.map((skill) => (
						<SkillCard
							key={skill.title}
							skill={skill}
							relevance={skill.relevance}
						/>
					))}
				</HorizontalView>

				{/* Timeline non-mobile */}
				<div className="contents max-md:hidden">
					<h2 className="my-2 font-bold">Experiences and Education</h2>
					<p>
						My background combines the analytical rigor of Computer Science with
						the human-centered insights of Cognitive Science, as detailed in the
						timeline below. This interdisciplinary education provides me with
						strong skills in problem-solving, user experience design, and
						effective communication, allowing me to excel in diverse projects.
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
						<ProjectCard
							key={project.title}
							project={project}
							relevance={project.relevance}
						/>
					))}
				</HorizontalView>

				{/* Features */}
				<h2 className="my-2 font-bold">Technical highlights</h2>
				<p>
					The features and technologies highlighted below offer a glimpse into
					my skillset and experience. I'm eager to discuss how my expertise and
					capabilities can contribute to your team! Some of them are still being
					built, but expected to be done within March 2025!
				</p>
				<div className="my-3 flex w-fit flex-wrap items-center gap-3">
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
						title="NextJS"
						description={
							<>
								Built with{" "}
								<a
									href="https://nextjs.org/"
									target="_blank"
									className="regular-link"
									rel="noreferrer"
								>
									NextJS
								</a>{" "}
								and deployed with{" "}
								<a
									href="https://vercel.com/"
									target="_blank"
									className="regular-link"
									rel="noreferrer"
								>
									Vercel
								</a>
								.
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
								You can tailor the resume to the job you're listing or what
								you're interested in! I've developed a system using{" "}
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
								embeddings on the information available on the page, AI agents
								can grasp the information that you want to know about "me".
								Ideally, this will be done using the{" "}
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
		</>
	);
};

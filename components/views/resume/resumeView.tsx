"use client";

import { skills as staticSkills, type Skill } from "@/lib/data/skills";
import { SkillCard } from "../skill";
import { LayoutGroup, motion } from "motion/react";
import { ScrollingWord } from "../../ui/scrollingWord";
import { useRef, type ComponentRef } from "react";
import { ProjectCard } from "../project";
import { projects as staticProjects, type Project } from "@/lib/data/projects";
import { Timeline } from "@/components/ui/timeline";
import { education, workExperience } from "@/lib/data/timeline";
import type { getResume } from "@/app/resume/resumeAction";
import { ArrowRight, NetworkIcon } from "lucide-react";
import { Popup } from "../../ui/popup";
import { useSectionsInView } from "./useSectionsInView";
import { Features } from "./features";
import { CardAccordion } from "@/components/ui/cardAccordion";
import { TOC } from "./toc";
import { RelevanceIndicator } from "@/components/ui/relevanceIndicator";
import { elements } from "./elements";
import { cn } from "@/lib/utils";
import { comforta } from "@/components/utils/fonts";
import { Main } from "../main";

export type ResumeViewProps = {
	resume?: Awaited<ReturnType<typeof getResume>>;
};

export const ResumeView = ({ resume }: ResumeViewProps) => {
	const scroll1Ref = useRef<ComponentRef<typeof ScrollingWord>>(null);
	const scroll2Ref = useRef<ComponentRef<typeof ScrollingWord>>(null);

	const { skillsRef, projectsRef, timelineRef, featuresRef } =
		useSectionsInView();

	const skills = resume?.skills ?? (Object.values(staticSkills) as Skill[]);
	const projects =
		resume?.projects ?? (Object.values(staticProjects) as Project[]);

	return (
		<div className="grid grid-cols-[auto_300px] gap-10 max-lg:grid-cols-1">
			<div className="col-start-2 pt-15 max-lg:hidden">
				<TOC className="sticky top-15" />
			</div>
			<Main className="relative col-start-1 row-start-1">
				<h1
					className={cn(
						comforta.className,
						"col-span-2 w-[70%] select-none text-balance font-bold text-5xl leading-18 max-sm:w-full max-sm:text-4xl max-sm:leading-10",
					)}
				>
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
							<span className="-top-5 -left-2 absolute ml-2 text-neutral-500 text-sm italic">
								Click us!
							</span>
						</motion.p>
					</LayoutGroup>

					<LayoutGroup>
						<motion.p
							layout
							className="w-fit cursor-pointer whitespace-nowrap text-[max(11px,_min(3vw,_40px))]"
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

				{resume && (
					<div className="my-9 flex flex-col gap-2">
						<p className=" text-neutral-600 text-sm">
							<NetworkIcon className="mr-2 inline size-4" />
							<span>This resume was generated using AI and tailored to a</span>{" "}
							<Popup
								content={
									<div>
										<blockquote className="text-md">
											“{resume.prompt}”
										</blockquote>
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

						<div className="flex items-center gap-2 text-neutral-600 text-sm">
							<span>Relevancy to your prompt</span>{" "}
							<ArrowRight className="size-4" /> <RelevanceIndicator score={7} />
						</div>
					</div>
				)}

				<div className="contents [&_h2]:mt-5 [&_h2]:text-xl [&_p]:max-w-[1000px]">
					{/* Introduction or cover letter */}
					<p className="my-9 text-xl">
						{resume?.cover ??
							"Dynamic Software Developer with 8 years of experience in Frontend and Backend development, including 1.5 years leading a Frontend community. Driven by a passion for innovation and a commitment to lifelong learning, I'm constantly seeking opportunities to leverage cutting-edge technologies."}
					</p>

					{/* Skills */}
					<div ref={skillsRef} id={elements.skills.id}>
						<h2 className="my-2 font-bold">{elements.skills.title}</h2>
						<p>
							I'm a versatile Developer with experience across the full software
							spectrum, from crafting Single-Page Applications and paginated
							backend REST solutions to exploring Bayesian data analytics and
							Post-Quantum Secure Signature Protocols. I thrive on tackling
							diverse challenges and delivering innovative solutions across
							Frontend, Backend, and Data Analysis domains.
						</p>

						<CardAccordion
							elements={skills as Skill[]}
							renderCard={(skill) => (
								<SkillCard
									key={skill.title}
									skill={skill}
									relevance={skill.relevance}
								/>
							)}
						/>
					</div>

					{/* Projects */}
					<div ref={projectsRef} id={elements.projects.id}>
						<h2 className="my-2 font-bold">{elements.projects.title}</h2>
						<p>
							In my professional and personal life, I've worked on a variety of
							projects. They vary much in their technical scope, Backend,
							Frontend, DevEx, Scripts, Cryptography, etc.
						</p>

						<CardAccordion
							max={2}
							elements={Object.values(projects)}
							renderCard={(project) => (
								<ProjectCard
									key={project.title}
									project={project}
									relevance={project.relevance}
								/>
							)}
						/>
					</div>

					<div
						ref={timelineRef}
						className="max-md:hidden"
						id={elements.timeline.id}
					>
						{/* Timeline non-mobile */}
						<h2 className="my-2 font-bold">{elements.timeline.title}</h2>
						<p>
							My background combines the analytical rigor of Computer Science
							with the human-centered insights of Cognitive Science, as detailed
							in the timeline below. This interdisciplinary education provides
							me with strong skills in problem-solving, user experience design,
							and effective communication, allowing me to excel in diverse
							projects.
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

						{/* TODO: Add timeline mobile */}
					</div>

					{/* Features */}
					<div ref={featuresRef} id={elements.features.id}>
						<h2 className="my-2 font-bold">{elements.features.title}</h2>
						<p>
							The features and technologies highlighted below offer a glimpse
							into my skillset and experience. I'm eager to discuss how my
							expertise and capabilities can contribute to your team! Some of
							them are still being built, but expected to be done within March
							2025!
						</p>
						<div className="my-3 flex w-fit flex-wrap items-center gap-3">
							<Features />
						</div>
					</div>
				</div>
			</Main>
		</div>
	);
};

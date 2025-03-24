"use client";

import { skills as staticSkills, type Skill } from "@/lib/data/skills";
import { SkillCard } from "./skill";
import {
	LayoutGroup,
	motion,
	useInView,
	type UseInViewOptions,
} from "motion/react";
import { ScrollingWord } from "../ui/scrollingWord";
import {
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
	type ComponentRef,
	type RefObject,
} from "react";
import { ProjectCard } from "./project";
import { projects as staticProjects, type Project } from "@/lib/data/projects";
import { Timeline } from "@/components/ui/timeline";
import { education, workExperience } from "@/lib/data/timeline";
import { FeatureTag } from "../ui/featureTag";
import type { getResume } from "@/app/resume/resumeAction";
import {
	AwardIcon,
	CpuIcon,
	FolderKanbanIcon,
	NetworkIcon,
	TimerIcon,
} from "lucide-react";
import { Popup } from "../ui/popup";
import { Accordion } from "../ui/accordion";
import { cn } from "@/lib/utils";
import { atom, useAtom, useSetAtom } from "jotai";

export type ResumeViewProps = {
	resume?: Awaited<ReturnType<typeof getResume>>;
};

function useSectionsInView() {
	const setSelectedElementId = useSetAtom(selectedElementEd);

	const options: UseInViewOptions = {
		amount: 1,
		// top right bottom left
		// margin: "500px 0px -100px 0px",
	};

	// Refs
	const root = useRef<HTMLDivElement>(null);
	const skillsRef = useRef<HTMLParagraphElement>(null);
	const projectsRef = useRef<HTMLParagraphElement>(null);
	const timelineRef = useRef<HTMLParagraphElement>(null);
	const featuresRef = useRef<HTMLParagraphElement>(null);

	const skillsInView = useInView(skillsRef, { root, ...options });
	const projectsInView = useInView(projectsRef, { root, ...options });
	const timelineInView = useInView(timelineRef, { root, ...options });
	const featuresInView = useInView(featuresRef, { root, ...options });

	useEffect(() => {
		skillsInView && setSelectedElementId(elements[0].id);
	}, [skillsInView]);

	useEffect(() => {
		projectsInView && setSelectedElementId(elements[1].id);
	}, [projectsInView]);

	useEffect(() => {
		timelineInView && setSelectedElementId(elements[2].id);
	}, [timelineInView]);

	useEffect(() => {
		featuresInView && setSelectedElementId(elements[3].id);
	}, [featuresInView]);

	return { root, skillsRef, projectsRef, timelineRef, featuresRef };
}

export const ResumeView = ({ resume }: ResumeViewProps) => {
	const scroll1Ref = useRef<ComponentRef<typeof ScrollingWord>>(null);
	const scroll2Ref = useRef<ComponentRef<typeof ScrollingWord>>(null);

	const {
		root: main,
		skillsRef,
		projectsRef,
		timelineRef,
		featuresRef,
	} = useSectionsInView();

	const skills = resume?.skills ?? (Object.values(staticSkills) as Skill[]);
	const projects =
		resume?.projects ?? (Object.values(staticProjects) as Project[]);

	return (
		<main
			ref={main}
			id="resume-view-container"
			className="@container relative overflow-auto py-10 pr-100 pl-15 max-sm:overflow-x-hidden max-md:max-w-full max-lg:px-5 print:overflow-visible"
		>
			<TOC />

			<h1 className="col-span-2 w-[70%] select-none text-balance font-bold text-5xl leading-18 max-sm:w-full max-sm:text-4xl max-sm:leading-10">
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
						<span className="absolute right-1 ml-2 text-neutral-500 text-sm italic">
							Click us!
						</span>
					</motion.p>
				</LayoutGroup>

				<LayoutGroup>
					<motion.p
						layout
						className="w-fit cursor-pointer whitespace-nowrap text-[max(20px,_min(3vw,_40px))]"
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
								<blockquote className="my-2 ml-3 text-md">
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
			)}

			<div className="contents [&_h2]:mt-5 [&_h2]:text-xl [&_p]:max-w-[1000px]">
				{/* Introduction or cover letter */}
				<p className="my-9 text-xl">
					{resume?.cover ??
						"Dynamic Software Developer with 8 years of experience in Frontend and Backend development, including 1.5 years leading a Frontend community. Driven by a passion for innovation and a commitment to lifelong learning, I'm constantly seeking opportunities to leverage cutting-edge technologies."}
				</p>

				{/* Skills */}
				<div ref={skillsRef} id={elements[0].id}>
					<h2 className="my-2 font-bold">{elements[0].title}</h2>
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
				<div ref={projectsRef} id={elements[1].id}>
					<h2 className="my-2 font-bold">{elements[1].title}</h2>
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

				<div ref={timelineRef} className="max-md:hidden" id={elements[2].id}>
					{/* Timeline non-mobile */}
					<h2 className="my-2 font-bold">{elements[2].title}</h2>
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

					{/* TODO: Add timeline mobile */}
				</div>

				{/* Features */}
				<div ref={featuresRef} id={elements[3].id}>
					<h2 className="my-2 font-bold">{elements[3].title}</h2>
					<p>
						The features and technologies highlighted below offer a glimpse into
						my skillset and experience. I'm eager to discuss how my expertise
						and capabilities can contribute to your team! Some of them are still
						being built, but expected to be done within March 2025!
					</p>
					<div className="my-3 flex w-fit flex-wrap items-center gap-3">
						<Features />
					</div>
				</div>
			</div>
		</main>
	);
};

const elements = [
	{ title: "Technical skills", id: "skills", icon: CpuIcon },
	{ title: "Notable Projects", id: "projects", icon: FolderKanbanIcon },
	{ title: "Experiences and Education", id: "timeline", icon: TimerIcon },
	{ title: "Technical features", id: "features", icon: AwardIcon },
];

function CardAccordion<T>(props: {
	max?: number;
	elements: T[];
	renderCard: (element: T) => JSX.Element;
}) {
	const { max = 3, elements, renderCard } = props;
	const [n, setN] = useState<number>(max);

	useLayoutEffect(() => {
		const controller = new AbortController();
		let main = document.getElementById("resume-view-container");
		window.addEventListener(
			"resize",
			() => {
				if (!main) main = document.getElementById("resume-view-container");
				if (!main) return;
				if (main.clientWidth < 768) {
					setN(1);
				} else if (main.clientWidth < 1280) {
					setN(2);
				} else {
					setN(max);
				}
			},
			{ signal: controller.signal },
		);
		return () => controller.abort();
	});

	return (
		<Accordion.Root className="border-0 shadow-none">
			<Accordion.Item value="skills">
				<div
					className="mt-8 grid items-center gap-6"
					style={{
						gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`,
					}}
				>
					{elements.slice(0, n).map(renderCard)}
				</div>
				<Accordion.Content className="mt-6 p-0">
					<div
						className="mb-6 grid items-center gap-6"
						style={{
							gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`,
						}}
					>
						{elements.slice(n).map(renderCard)}
					</div>
				</Accordion.Content>
				<Accordion.Trigger className="mt-5 flex w-fit items-center gap-2 rounded-md border border-neutral-100 px-3 py-1 shadow-md transition-transform duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.95]">
					{/* @ts-ignore */}
					{({ open }) => (open ? "Less" : "More")}
				</Accordion.Trigger>
			</Accordion.Item>
		</Accordion.Root>
	);
}

const selectedElementEd = atom(elements[0].id);

const TOC = () => {
	const [selectedElementId, setSelectedElementId] = useAtom(selectedElementEd);

	return (
		<nav className="fixed top-45 right-15 w-fit rounded-xl border border-neutral-200 bg-white shadow-md max-lg:hidden">
			{/* <h3 className="mb-3 text-neutral-600 text-sm">Table of contents</h3> */}
			<ul>
				{elements.map(({ id, title, icon: Icon }) => {
					const isSelected = id === selectedElementId;
					return (
						<li
							key={id}
							className={cn(
								"relative flex items-center gap-3 border-neutral-300 border-b px-4 py-2 transition-all last:border-none",
								{ "font-bold": isSelected },
							)}
						>
							{isSelected && (
								<motion.div
									layoutId="toc-dot"
									className="-left-[5px] absolute"
									transition={{ ease: "easeInOut", duration: 0.6 }}
								>
									{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
									<svg
										className="size-[22px] border-none fill-neutral-300"
										viewBox="0 0 322.39 557.21"
									>
										<path
											className="shadow-2xl"
											d="M0,0v557.21c0-55.06,27.62-103.65,69.75-132.74,54.1-26,91.45-81.32,91.45-145.37,0-56.68-29.25-106.52-73.49-135.26-1.01-.66-2.03-1.31-3.06-1.95-2.75-1.48-5.45-3.05-8.1-4.68C30.61,108.8,0,57.98,0,0Z"
										/>
									</svg>
								</motion.div>
							)}
							<Icon className={cn("z-10 size-4 transition-colors")} />
							<a
								href={`#${id}`}
								className="whitespace-nowrap"
								onClick={() => {
									const element = document.getElementById(id)
										?.firstElementChild as HTMLElement;
									element?.offsetParent?.scrollTo({
										top: element?.offsetTop,
										behavior: "smooth",
									});
									setSelectedElementId(id);
								}}
							>
								{title}
							</a>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

const Features = () => {
	return (
		<>
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
						to allow you to chat with agents (RAG) that tailor the resume to be
						more streamlined to your needs!
					</>
				}
				todo
			/>
			<FeatureTag
				title="PostgreSQL"
				description={
					<>
						Taking advantage of <pre className="inline font-bold">pgvector</pre>{" "}
						for storing embeddings on the information available on the page, AI
						agents can grasp the information that you want to know about "me".
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
			/>
			<FeatureTag
				title="Page transitions"
				description={
					<>
						Neat Page transitions are handled with{" "}
						<a
							href="https://www.framer.com/motion/"
							target="_blank"
							className="regular-link"
							rel="noreferrer"
						>
							Framer Motion
						</a>
						.
					</>
				}
				todo
			/>
		</>
	);
};

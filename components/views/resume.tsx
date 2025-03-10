"use client";
import { skills } from "@/lib/data/skills";
import { SkillCard } from "./skill";
import { LayoutGroup, motion } from "motion/react";
import { HorizontalView } from "../ui/horizontalView";
import { ScrollingWord } from "../ui/scrollingWord";
import { useRef, type ComponentRef } from "react";
import { ProjectCard } from "./project";
import { projects } from "@/lib/data/projects";
import { Timeline } from "@/components/ui/timeline";
import {
	BookUser,
	Computer,
	GraduationCap,
	Baby,
	Brush,
	Users,
	NotebookPen,
} from "lucide-react";

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type ResumeViewProps = {};

export const ResumeView = () => {
	const scroll1Ref = useRef<ComponentRef<typeof ScrollingWord>>(null);
	const scroll2Ref = useRef<ComponentRef<typeof ScrollingWord>>(null);
	return (
		<div className="[&>h2]:mt-5 [&>h2]:text-xl [&>p]:max-w-[1000px]">
			<LayoutGroup>
				<h1 className="col-span-2 w-[70%] text-balance font-bold text-6xl leading-18">
					<motion.p
						layout
						className="relative w-fit cursor-pointer whitespace-nowrap"
						role="button"
						onClick={() => scroll1Ref.current?.scrollWord()}
					>
						<ScrollingWord
							ref={scroll1Ref}
							active
							words={["Software", "Frontend", "DevEx", "Senior"]}
						/>{" "}
						<motion.span layout>Developer</motion.span>
						<span className="absolute text-neutral-500 text-sm italic">
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
								"funky",
							]}
						/>{" "}
						<motion.span layout>software for the web</motion.span>
					</motion.p>
				</h1>
			</LayoutGroup>

			{/* Introduction or cover letter */}
			<p className="my-5">
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

			{/* Timeline */}
			<h2 className="my-2 font-bold">Experiences and Education</h2>
			<p>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati
				earum, eum sunt fuga consequatur ab quasi unde cumque, labore magni ea
				velit nobis repellendus nihil libero minus aperiam, quod qui.
			</p>

			<div className="my-10">
				<Timeline
					min={2014}
					max={2025}
					rows={[
						{
							heading: "Education",
							entries: {
								2015: {
									start: 2015,
									end: 2018,
									content: "Cognitive Science (Ba)",
									color: "rgb(90 110 250)",
									textColor: "#fff",
									icon: <BookUser size={15} />,
								},
								2017: {
									start: 2017,
									end: 2020,
									content: "Computer Science (Ba)",
									color: "rgb(225 118 118)",
									textColor: "#000",
									icon: <Computer size={15} />,
								},
								2023: {
									start: 2023,
									end: 2025,
									content: "Computer Science (Ma)",
									color: "rgb(225 118 218)",
									textColor: "#000",
									icon: <GraduationCap size={15} />,
								},
							},
						},
						{
							heading: "Work",
							entries: {
								2017: {
									start: 2017,
									end: 2020,
									content: "Student Software Engineer",
									color: "#94b144",
									icon: <Baby size={15} />,
								},
								2020: {
									start: 2020,
									end: 2021,
									content: "Frontend Developer",
									color: "#94b144",
									icon: <Brush size={15} />,
								},
								2021: {
									start: 2021,
									end: 2023,
									content: "Frontend Tech Lead",
									color: "#94b144",
									icon: <Users size={15} />,
								},
								2023: {
									start: 2023,
									end: 2025,
									content: "Senior Software Engineer (Part time)",
									color: "#94b144",
									icon: <NotebookPen size={15} />,
								},
							},
						},
					]}
				/>
			</div>

			{/* Projects */}
			<h2 className="my-2 font-bold">Notable Projects</h2>
			<p>
				In my professional and personal life, I've worked on a variety of
				projects.
			</p>

			<HorizontalView active>
				{Object.values(projects).map((project) => (
					<ProjectCard key={project.title} project={project} />
				))}
			</HorizontalView>
		</div>
	);
};

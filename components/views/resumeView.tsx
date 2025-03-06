"use client";
import { skills } from "@/lib/data/skills";
import { SkillCard } from "./skill";
import { hover, motion } from "motion/react";
import { HorizontalView } from "../ui/horizontalView";

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type ResumeViewProps = {};

export const ResumeView = () => {
	return (
		<motion.div
			className="flex w-full flex-col [&_>_h2:not(:first-child)]:mt-10 [&_p]:mb-5"
			whileHover="hover"
		>
			{/* Cover letter */}
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil id
				veritatis enim sequi reiciendis quia nobis suscipit! Doloribus
				reprehenderit commodi rerum officia! Atque, quia. Id deserunt maxime
				libero nam illo.
			</p>

			<p>
				Sit proident in sint mollit veniam exercitation ipsum aute ipsum
				occaecat nisi voluptate adipisicing. Lorem cupidatat et proident ullamco
				consequat non culpa nisi voluptate aute aute ex. Exercitation aliquip
				consequat culpa adipisicing ea.
			</p>

			<p>
				Do exercitation elit esse id laboris ea deserunt aliqua adipisicing
				magna aliquip. Quis sit minim exercitation anim esse. Ipsum non non
				exercitation do duis id ut. Voluptate adipisicing eu Lorem sit voluptate
				et. Incididunt et eu sunt minim mollit proident non. Laboris incididunt
				minim non occaecat exercitation.
			</p>

			<p>
				Incididunt et duis elit exercitation anim minim occaecat cillum fugiat
				in exercitation minim ea. Fugiat reprehenderit sit magna velit do ut
				ipsum do. Irure exercitation incididunt ullamco do officia dolore sint
				irure eiusmod minim. Dolor nostrud eiusmod minim et. Est ea esse mollit
				aliquip voluptate ipsum sunt non voluptate adipisicing cupidatat nulla.
			</p>

			<p>
				Aliquip magna tempor Lorem elit elit quis non. Nostrud ad tempor sit
				laborum. Occaecat ipsum Lorem minim eiusmod. Culpa pariatur dolor
				exercitation duis duis enim deserunt in pariatur ex duis dolore.
			</p>
			{/* Skills */}
			<h2 className="text-xl ">Skills</h2>
			<p className="text-neutral-700">
				These are the core skills that I have developed over the years.
			</p>
			<HorizontalView>
				{Object.values(skills).map((skill, i) => (
					<SkillCard key={skill.title} skill={skill} relevance={i} />
				))}
			</HorizontalView>

			{/* Projects */}
			<h2 className="mt-10 text-xl">Projects</h2>
			<p className="text-neutral-700">
				Projects and contributions that I developed.
			</p>
			<HorizontalView>
				{Object.values(skills).map((skill, i) => (
					<SkillCard key={skill.title} skill={skill} relevance={i} />
				))}
			</HorizontalView>
		</motion.div>
	);
};

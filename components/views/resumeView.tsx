"use client";
import { skills } from "@/lib/data/skills";
import { SkillCard } from "./skill";
import { hover, motion } from "motion/react";
import { ScrollXHover } from "../ui/scrollXHover";

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type ResumeViewProps = {};

export const ResumeView = () => {
	return (
		<motion.div className="flex w-full flex-col gap-5" whileHover="hover">
			{/* Skills */}
			<motion.p
				variants={{
					hover: { opacity: 1, x: 0 },
				}}
				className="text-neutral-600 text-sm"
				initial={{ opacity: 0, x: -20 }}
			>
				Click for more details...
			</motion.p>
			<ScrollXHover>
				{Object.values(skills).map((skill) => (
					<SkillCard key={skill.title} skill={skill} className="" />
				))}
			</ScrollXHover>
		</motion.div>
	);
};

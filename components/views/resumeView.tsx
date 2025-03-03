"use client";
import { skills } from "@/lib/data/skills";
import { SkillCard } from "./skill";
import { hover, motion } from "motion/react";
import { HorizontalView } from "../ui/horizontalView";

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type ResumeViewProps = {};

export const ResumeView = () => {
	return (
		<motion.div className="flex w-full flex-col gap-5" whileHover="hover">
			{/* Skills */}
			<HorizontalView>
				{Object.values(skills).map((skill, i) => (
					<SkillCard key={skill.title} skill={skill} relevance={i} />
				))}
			</HorizontalView>
		</motion.div>
	);
};

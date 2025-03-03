// A component that displays a Card with the skill information

import type { Skill } from "@/lib/data/skills";
import { Card } from "../ui/card";
import { useEffect, useMemo, useState, type ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Tag } from "../ui/tag";
import {
	animate,
	type AnimationPlaybackControls,
	motion,
	useMotionValue,
} from "motion/react";
import useMeasure from "react-use-measure";

interface SkillCardProps {
	skill: Skill;
}

export const SkillCard = ({
	skill,
	className,
	...props
}: SkillCardProps & ComponentProps<typeof Card.Root>) => {
	const { title, subtitle, content, tags, projects } = skill;
	const [ref, { width }] = useMeasure();

	return (
		<Card.Root
			className={cn("min-w-80 max-w-90", className)}
			{...props}
			whileHover="hover"
		>
			<Card.Title>{title}</Card.Title>
			<Card.Subtitle>{subtitle}</Card.Subtitle>
			<Card.EllipsisContent>{content}</Card.EllipsisContent>
			<Card.Content ref={ref} className="flex flex-2 items-end overflow-clip">
				<TagsCarousel tags={tags} parentWidth={width} />
			</Card.Content>
		</Card.Root>
	);
};

const TagsCarousel = ({
	tags,
	parentWidth,
}: {
	tags: string[];
	parentWidth: number;
}) => {
	const [ref, { width }] = useMeasure();

	const shouldScroll = useMemo(() => parentWidth < width, [parentWidth, width]);

	return (
		<motion.div
			ref={ref}
			className="flex gap-2"
			variants={{
				hover: {
					x: [0, -width / 2 - 8],
					transition: {
						ease: "linear",
						duration: 25,
						repeat: Number.POSITIVE_INFINITY,
						repeatType: "loop",
						repeatDelay: 0,
					},
				},
			}}
			initial={{ x: 0, transition: { duration: .2 } }}
		>
			{[...tags, ...(shouldScroll ? tags : [])].map((t, i) => (
				<Tag key={i}>{t}</Tag>
			))}
		</motion.div>
	);
};

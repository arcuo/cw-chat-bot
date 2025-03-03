// A component that displays a Card with the skill information

import type { Skill } from "@/lib/data/skills";
import { Card } from "../ui/card";
import { useLayoutEffect, useMemo, useState, type ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Tag } from "../ui/tag";
import { hover, motion } from "motion/react";
import useMeasure from "react-use-measure";
import { Dialog } from "../ui/dialog";
import { RelevanceIndicator } from "../ui/relevanceIndicator";

interface SkillCardProps {
	skill: Skill;
	relevance: number;
}

export const SkillCard = ({
	skill,
	relevance,
	className,
	...props
}: SkillCardProps & ComponentProps<typeof Card.Root>) => {
	const { title, subtitle, content, tags, projects } = skill;
	const [ref, { width }] = useMeasure();

	return (
		<Dialog
			trigger={
				<Card.Root
					className={cn("relative min-w-100 max-w-110", className)}
					{...props}
					whileHover="hover"
					whileFocus="hover"
				>
					<motion.span
						variants={{
							hover: { opacity: 1, y: 5 },
						}}
						className="-bottom-5 absolute right-1/2 translate-x-1/2 text-neutral-500 text-sm"
						initial={{ opacity: 0, y: 0 }}
					>
						Click for more details
					</motion.span>
					<Card.Title className="flex items-center justify-between gap-2">
						{title}
						{/* Relevance score */}
						<RelevanceIndicator
							score={(((relevance + 3) % 4) + 1) as 1 | 2 | 3 | 4}
						/>
					</Card.Title>
					<Card.Subtitle>{subtitle}</Card.Subtitle>
					<Card.EllipsisContent className="text-neutral-700">
						{content}
					</Card.EllipsisContent>
					<Card.Content ref={ref} className="flex w-full flex-2 overflow-clip">
						<TagsCarousel tags={tags} parentWidth={width} />
					</Card.Content>
				</Card.Root>
			}
			content={
				<div className="flex flex-col gap-5">
					<div>{content}</div>
					<div className="flex flex-wrap gap-2">
						{tags.map((t) => (
							<Tag key={t}>{t}</Tag>
						))}
					</div>
				</div>
			}
			title={title}
			subtitle={subtitle}
		/>
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
	const [shouldScroll, setShouldScroll] = useState(false);

	useLayoutEffect(() => {
		if (parentWidth < width) {
			setShouldScroll(true);
		}
	}, [parentWidth, width]);

	return (
		<motion.div
			ref={ref}
			className="flex gap-2"
			variants={{
				hover: shouldScroll
					? {
							x: [0, -width / 2 - 8],
							transition: {
								ease: "linear",
								duration: 25,
								repeat: Number.POSITIVE_INFINITY,
								repeatType: "loop",
								repeatDelay: 0,
							},
						}
					: {},
			}}
			initial={{ x: 0, transition: { duration: 0.2 } }}
		>
			{[...tags, ...(shouldScroll ? tags : [])].map((t, i) => (
				<Tag key={i}>{t}</Tag>
			))}
		</motion.div>
	);
};

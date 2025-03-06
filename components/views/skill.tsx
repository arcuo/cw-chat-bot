// A component that displays a Card with the skill information

import type { Skill } from "@/lib/data/skills";
import { Card } from "../ui/card";
import type { ComponentProps } from "react";
import { Tag, TagsCarousel } from "../ui/tag";
import useMeasure from "react-use-measure";
import { DataCard } from "../ui/dataCard";

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
	const { title, subtitle, content, tags } = skill;
	const [ref, { width }] = useMeasure();

	return (
		<DataCard
			relevance={relevance}
			cardContent={
				<div>
					<Card.EllipsisContent className="text-neutral-700">
						{content}
					</Card.EllipsisContent>
					<Card.Content ref={ref} className="flex w-full flex-2 overflow-clip">
						<TagsCarousel tags={tags} parentWidth={width} />
					</Card.Content>
				</div>
			}
			title={title}
			subtitle={subtitle}
			dialogContent={
				<div className="flex flex-col gap-5">
					<div>{content}</div>
					<div className="flex flex-wrap gap-2">
						{tags.map((t) => (
							<Tag key={t}>{t}</Tag>
						))}
					</div>
				</div>
			}
		/>
	);
};

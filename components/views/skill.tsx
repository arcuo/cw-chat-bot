// A component that displays a Card with the skill information

import type { Skill } from "@/lib/data/skills";
import { Card } from "../ui/card";
import {
	useRef,
	type ComponentPropsWithoutRef,
	type ComponentRef,
} from "react";
import { Tag, TagsCarousel } from "../ui/tag";
import useMeasure from "react-use-measure";
import { DataCard } from "../ui/dataCard";
import { cn } from "@/lib/utils";
import { DialogClose } from "@radix-ui/react-dialog";
import { Link1Icon } from "@radix-ui/react-icons";
import { Button, LinkButton } from "../ui/button";

interface SkillCardProps {
	skill: Skill;
	relevance?: number;
}

export const SkillCard = ({
	skill,
	relevance,
	className,
	...props
}: SkillCardProps & ComponentPropsWithoutRef<typeof Card.Root>) => {
	const { title, subtitle, content, tags, projects } = skill;
	const [ref, { width }] = useMeasure();
	const dialog = useRef<ComponentRef<typeof DataCard>>(null);

	return (
		<DataCard
			ref={dialog}
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
					{/* Content */}
					<label className="-mb-4 font-bold text-sm" htmlFor="content">
						Overview
					</label>
					<div id="content">{content}</div>

					{/* Project links */}
					{projects && (
						<>
							<label className="-mb-4 font-bold text-sm" htmlFor="projects">
								Related projects
							</label>
							<div id="projects" className="flex flex-wrap gap-2">
								{projects.map((p) => (
									<DialogClose key={p.id}>
										<Button
											// biome-ignore lint/a11y/useSemanticElements: <explanation>
											role="link"
											className="flex items-center gap-2 px-2 py-1 text-sm"
											onClick={() => {
												dialog.current?.close();
												const ele = document.getElementById(
													`project-${p.id}-card`,
												);
												ele?.click();
											}}
											key={p.id}
										>
											<Link1Icon />
											{p.title}
										</Button>
									</DialogClose>
								))}
							</div>
						</>
					)}

					{/* Tags */}
					<div className="flex flex-wrap gap-2">
						{tags.map((t) => (
							<Tag key={t}>{t}</Tag>
						))}
					</div>
				</div>
			}
			className={cn("box-border border-amber-400 border-b-5", className)}
			{...props}
		/>
	);
};

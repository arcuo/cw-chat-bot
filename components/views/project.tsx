// A component that displays a Card with the project information

import type { Project } from "@/lib/data/projects";
import { Card } from "../ui/card";
import type { ComponentPropsWithoutRef } from "react";
import { Tag, TagsCarousel } from "../ui/tag";
import useMeasure from "react-use-measure";
import { DataCard } from "../ui/dataCard";
import { cn } from "@/lib/utils";
import { Link2Icon } from "@radix-ui/react-icons";
import type { RelevanceScore } from "../ui/relevanceIndicator";

interface ProjectCardProps {
	project: Project;
	relevance?: RelevanceScore;
}

export const ProjectCard = ({
	project,
	relevance,
	className,
	...props
}: ProjectCardProps & ComponentPropsWithoutRef<typeof Card.Root>) => {
	const { title, subtitle, productDescription, content, tags, link } = project;
	const [ref, { width }] = useMeasure();

	return (
		<DataCard
			id={`project-${project.id}-card`}
			relevance={relevance}
			cardContent={
				<>
					<Card.EllipsisContent className="text-neutral-700">
						{content}
					</Card.EllipsisContent>
					<Card.Content
						ref={ref}
						className="flex w-full flex-2 items-end overflow-clip"
					>
						<TagsCarousel
							tags={tags}
							parentWidth={width}
							tagProps={{ className: "bg-cyan-300/20" }}
						/>
					</Card.Content>
				</>
			}
			title={title}
			subtitle={subtitle}
			dialogContent={
				<div className="flex flex-col gap-5">
					{/* Product Description */}
					<label
						className="-mb-4 font-bold text-sm"
						htmlFor="productDescription"
					>
						Product Description
					</label>
					<div id="productDescription">{productDescription}</div>

					{/* Overview */}
					<label className="-mb-4 font-bold text-sm" htmlFor="content">
						Overview
					</label>
					<div id="content">{content}</div>

					{/* Link */}
					{link && (
						<a
							className="flex w-fit items-center gap-2 hover:fill-blue-600 hover:text-blue-600"
							target="_blank"
							rel="noopener noreferrer"
							href={link?.href}
						>
							<Link2Icon />
							{link?.text}
						</a>
					)}

					{/* Tags */}
					<div className="flex flex-wrap items-end gap-2">
						{tags.map((t) => (
							<Tag key={t}>{t}</Tag>
						))}
					</div>
				</div>
			}
			className={cn("box-border border-cyan-600 border-b-5", className)}
			{...props}
		/>
	);
};

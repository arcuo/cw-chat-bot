// A component that displays a Card with the skill information

import type { Skill } from "@/lib/data/skills";
import { Card } from "../ui/card";
import {
	forwardRef,
	useImperativeHandle,
	useState,
	type ComponentPropsWithoutRef,
	type CSSProperties,
} from "react";
import { Tag, TagsCarousel } from "../ui/tag";
import { cn } from "@/lib/utils";
import { Link1Icon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import type { Project } from "@/lib/data/projects";
import { Dialog } from "../ui/dialog";
import {
	RelevanceIndicator,
	type RelevanceScore,
} from "../ui/relevanceIndicator";
import { ProjectDialogBody } from "./project";
import { AnimatePresence, motion } from "motion/react";
import useMeasure from "react-use-measure";

interface SkillCardProps {
	skill: Skill;
	relevance?: RelevanceScore;
}

export const ProjectLink = ({
	project: p,
	setShowProject,
}: { project: Project; setShowProject: (project: Project | null) => void }) => (
	<Button
		role="link"
		className="grid max-w-full grid-cols-[min-content_auto] items-center gap-2 overflow-hidden whitespace-nowrap px-2 py-1 text-sm"
		onClick={() => setShowProject(p)}
		key={p.id}
	>
		<Link1Icon />
		<span className="truncate">{p.title}</span>
	</Button>
);

export const SkillCard = forwardRef<
	{ close: () => void },
	SkillCardProps & ComponentPropsWithoutRef<typeof Card.Root>
>(({ skill, relevance, className, ...props }, ref) => {
	const { title, subtitle, content, tags, projects } = skill;

	const [showProject, setShowProject] = useState<Project | null>(null);
	const [open, setOpen] = useState(false);
	const [measureRef, { width }] = useMeasure();

	function onOpenChange(open: boolean) {
		setShowProject(null);
		setOpen(open);
	}

	useImperativeHandle(ref, () => ({
		close: () => setOpen(false),
	}));

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
			trigger={
				<Card.Root
					{...props}
					className={cn("box-border border-amber-400 border-b-5", className)}
					whileHover="hover"
					whileFocus="hover"
				>
					{/* Header */}
					<Card.Title className="w-full overflow-hidden text-ellipsis text-nowrap font-bold max-md:flex-col">
						{title}
					</Card.Title>

					{/* Relevance score */}
					{relevance !== undefined && <RelevanceIndicator score={relevance} />}
					<Card.Subtitle className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
						{subtitle}
					</Card.Subtitle>

					{/* Content */}
					<Card.EllipsisContent>{content}</Card.EllipsisContent>

					{/* Tags */}
					<Card.Content
						ref={measureRef}
						className="flex w-full flex-2 items-end overflow-clip"
					>
						<TagsCarousel
							tags={tags}
							parentWidth={width}
							tagProps={{ className: "bg-amber-500/20" }}
						/>
					</Card.Content>

					<span className="flex items-end justify-center text-neutral-500 text-sm sm:hidden">
						Click for more details
					</span>
				</Card.Root>
			}
			content={
				<AnimatePresence initial={false} mode="wait">
					{showProject ? (
						<motion.div
							key={showProject.id}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="flex flex-col gap-5"
						>
							<div className="grid grid-cols-2 items-center">
								<h3 className="font-bold">{showProject.title}</h3>
								<h4 className="row-start-2 text-neutral-700 text-sm">
									{showProject.subtitle}
								</h4>
								<Button
									className="col-start-2 row-span-2 justify-self-end"
									onClick={() => setShowProject(null)}
								>
									Back
								</Button>
							</div>

							<div>
								<ProjectDialogBody project={showProject} />
							</div>
						</motion.div>
					) : (
						<motion.div
							className="flex flex-col space-y-6"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							{/* Content */}
							<div className="grid gap-2">
								<label className="font-bold text-sm" htmlFor="content">
									Overview
								</label>
								<div id="content" className="flex flex-col gap-2">
									{content.map((c, i) => (
										<p key={`skill-content-${i}`}>{c}</p>
									))}
								</div>
							</div>

							{/* Project links */}
							{projects && (
								<div className="grid gap-2">
									<label className="font-bold text-sm" htmlFor="projects">
										Related projects
									</label>
									<div id="projects" className="flex flex-wrap gap-2">
										{projects.map((p) => (
											<ProjectLink
												key={p.id}
												project={p}
												setShowProject={setShowProject}
											/>
										))}
									</div>
								</div>
							)}

							{/* Tags */}
							<div className="flex flex-2 flex-wrap items-end gap-2">
								{tags.map((t) => (
									<Tag key={t}>{t}</Tag>
								))}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			}
			title={title}
			subtitle={subtitle}
		/>
	);
});

// A component that displays a Card with the skill information

import { Card } from "../ui/card";
import type { ReactNode, ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Dialog } from "../ui/dialog";
import { RelevanceIndicator } from "../ui/relevanceIndicator";

interface DataCardProps {
	title: ReactNode;
	subtitle: ReactNode;
	cardContent: ReactNode;
	dialogContent: ReactNode;
	relevance: number;
}

export const DataCard = ({
	title,
	subtitle,
	dialogContent,
	cardContent,
	relevance,
	className,
	...props
}: DataCardProps & ComponentProps<typeof Card.Root>) => {
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

					{/* Header */}
					<Card.Title className="flex items-center justify-between gap-2">
						{title}
						{/* Relevance score */}
						<RelevanceIndicator
							score={(((relevance + 3) % 4) + 1) as 1 | 2 | 3 | 4}
						/>
					</Card.Title>
					<Card.Subtitle>{subtitle}</Card.Subtitle>

					{/* Content */}
					{cardContent}
				</Card.Root>
			}
			content={dialogContent}
			title={title}
			subtitle={subtitle}
		/>
	);
};

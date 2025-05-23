// A component that displays a Card with the skill information

import { Card } from "../ui/card";
import {
	type ReactNode,
	type ComponentProps,
	forwardRef,
	useState,
	useImperativeHandle,
} from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Dialog } from "../ui/dialog";
import {
	RelevanceIndicator,
	type RelevanceScore,
} from "../ui/relevanceIndicator";

interface DataCardProps {
	title: ReactNode;
	subtitle: ReactNode;
	cardContent: ReactNode;
	dialogContent: ReactNode;
	relevance?: RelevanceScore;
}

export const DataCard = forwardRef<
	{ close: () => void },
	DataCardProps & Omit<ComponentProps<typeof Card.Root>, "title">
>(
	(
		{
			title,
			subtitle,
			dialogContent,
			cardContent,
			relevance,
			className,
			...props
		},
		ref,
	) => {
		const [open, setOpen] = useState(false);

		useImperativeHandle(ref, () => ({
			close: () => setOpen(false),
		}));

		return (
			<Dialog
				ref={ref}
				open={open}
				onOpenChange={setOpen}
				trigger={
					<Card.Root
						className={cn(
							// "relative max-w-110 max-sm:max-w-50 max-md:max-w-75 md:min-w-100",
							className,
						)}
						{...props}
						whileHover="hover"
						whileFocus="hover"
					>
						<motion.span
							variants={{
								hover: { opacity: 1, y: 5 },
							}}
							className="-bottom-6 absolute right-1/2 translate-x-1/2 text-neutral-500 text-sm"
							initial={{ opacity: 0, y: 0 }}
						>
							Click for more details
						</motion.span>

						{/* Header */}
						<Card.Title className=" w-full overflow-hidden text-ellipsis text-nowrap font-bold max-md:flex-col">
							{title}
						</Card.Title>

						{/* Relevance score */}
						{relevance !== undefined && (
							<RelevanceIndicator score={relevance} />
						)}
						<Card.Subtitle className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
							{subtitle}
						</Card.Subtitle>

						{/* Content */}
						{cardContent}
						<span className="flex items-end justify-center text-neutral-500 text-sm sm:hidden">
							Click for more details
						</span>
					</Card.Root>
				}
				content={dialogContent}
				title={title}
				subtitle={subtitle}
			/>
		);
	},
);

"use client";
import * as Popover from "@radix-ui/react-popover";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useState, type ComponentProps, type ReactNode } from "react";

const variants: Variants = {
	open: {
		opacity: 1,
		y: 0,
	},
	closed: {
		opacity: 0,
		y: 5,
	},
};

const MotionContent = motion.create(Popover.Content);

export const Popup = ({
	children,
	content,
	defaultOpen,
	...contentProps
}: Omit<Popover.PopoverContentProps, "content"> & {
	content: ReactNode;
	defaultOpen?: boolean;
	children: ReactNode;
}) => {
	const [open, setOpen] = useState(defaultOpen ?? false);

	return (
		<Popover.Root open={open} onOpenChange={setOpen}>
			<Popover.Trigger asChild>{children}</Popover.Trigger>
			<AnimatePresence>
				{open && (
					<Popover.Portal forceMount>
						<Popover.Content
							sideOffset={7}
							side="top"
							collisionPadding={15}
							title="Popup"
							{...contentProps}
						>
							<motion.div
								className="w-fit max-w-[min(400px,90vw)] rounded-md border border-neutral-300 bg-white p-2 shadow-md"
								variants={variants}
								initial="closed"
								animate="open"
								exit="closed"
								transition={{ duration: 0.1 }}
							>
								{content}
								<Popover.Arrow
									id="popover-arrow"
									className="fill-neutral-300"
								/>
							</motion.div>
						</Popover.Content>
					</Popover.Portal>
				)}
			</AnimatePresence>
		</Popover.Root>
	);
};

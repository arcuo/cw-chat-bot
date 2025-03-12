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
							{...contentProps}
						>
							<motion.div
								className="w-fit max-w-100 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm shadow-lg"
								variants={variants}
								initial="closed"
								animate="open"
								exit="closed"
								transition={{ duration: 0.1 }}
							>
								{content}
								<Popover.Arrow id="popover-arrow" className="-mb fill-white stroke-1 stroke-neutral-400" />
							</motion.div>
						</Popover.Content>
					</Popover.Portal>
				)}
			</AnimatePresence>
		</Popover.Root>
	);
};

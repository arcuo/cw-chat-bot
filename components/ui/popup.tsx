"use client";
import * as Popover from "@radix-ui/react-popover";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useState, type ReactNode } from "react";

const variants: Variants = {
	open: {
		opacity: 1,
		y: 0,
	},
	closed: {
		opacity: 0,
		y: -5,
	},
};

export const Popup = ({
	children,
    content,
    defaultOpen,
	...props
}: Omit<React.HTMLAttributes<HTMLDivElement>, "content"> & { content: ReactNode, defaultOpen?: boolean }) => {
	const [open, setOpen] = useState(defaultOpen ?? false);
	return (
		<Popover.Root open={open} onOpenChange={setOpen}>
			<Popover.Trigger asChild>{children}</Popover.Trigger>
			<AnimatePresence>
				{open && (
					<Popover.Portal forceMount>
						<Popover.Content sideOffset={7} asChild {...props}>
							<motion.div
								className="w-fit rounded-md border border-neutral-200 bg-white px-3 py-2 shadow-lg"
								variants={variants}
								initial="closed"
								animate="open"
								exit="closed"
                                transition={{duration: 0.1}}
							>
								{content}
							</motion.div>
						</Popover.Content>
					</Popover.Portal>
				)}
			</AnimatePresence>
		</Popover.Root>
	);
};

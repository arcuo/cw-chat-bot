"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";

import { Cross2Icon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "motion/react";
import {
	forwardRef,
	type ReactNode,
	useEffect,
	useImperativeHandle,
	useState,
} from "react";

type DialogProps = {
	trigger: ReactNode;
	title: ReactNode;
	subtitle: ReactNode;
	content: ReactNode;
};

export const Dialog = forwardRef<
	{ close: () => void },
	DialogProps &
		React.ComponentProps<typeof DialogPrimitive.Root> & {
			disabled?: boolean;
		}
>(({ title, subtitle, trigger, content, open, disabled, ...rest }, ref) => {
	const [_open, setOpen] = useState(open ?? false);
	const isOpen = open ?? _open;

	useImperativeHandle(ref, () => ({
		close: () => setOpen(false),
	}));

	return (
		<DialogPrimitive.Root
			open={isOpen}
			onOpenChange={disabled ? undefined : setOpen}
			{...rest}
		>
			<DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
			<AnimatePresence>
				{isOpen && (
					<DialogPrimitive.Portal key="modal" forceMount>
						<DialogPrimitive.Overlay asChild>
							<motion.div
								className="fixed inset-0 bg-neutral-950/50"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.1 }}
							/>
						</DialogPrimitive.Overlay>
						<DialogPrimitive.Content asChild>
							<motion.div
								initial={{ y: 10, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								exit={{ y: 10, opacity: 0 }}
								className="-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 flex max-h-[90%] transform flex-col gap-2 rounded-lg bg-neutral-50 shadow-md *:p-5 max-lg:w-[90%]"
							>
								<div className="grid grid-cols-2 gap-2 border-neutral-200 border-b">
									<DialogPrimitive.Title className="text-xl">
										{title}
									</DialogPrimitive.Title>
									<DialogPrimitive.Description className="col-span-2 row-start-2 text-neutral-700 text-sm italic">
										{subtitle}
									</DialogPrimitive.Description>
									<div className="col-start-2 text-right">
										<DialogPrimitive.Close
											className="cursor-pointer p-1 text-neutral-500 hover:text-neutral-900"
											aria-label="Close dialog"
										>
											<Cross2Icon />
										</DialogPrimitive.Close>
									</div>
								</div>
								<div className="flex-2 overflow-y-scroll">{content}</div>
							</motion.div>
						</DialogPrimitive.Content>
					</DialogPrimitive.Portal>
				)}
			</AnimatePresence>
		</DialogPrimitive.Root>
	);
});

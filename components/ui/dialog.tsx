"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";

import { Cross2Icon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "motion/react";
import { type ReactNode, useState } from "react";

type DialogProps = {
	trigger: ReactNode;
	title: ReactNode;
	subtitle: ReactNode;
	content: ReactNode;
};

export const Dialog = ({
	title,
	subtitle,
	trigger,
	content,
	open,
	...rest
}: DialogProps & React.ComponentProps<typeof DialogPrimitive.Root>) => {
	const [_open, setOpen] = useState(open ?? false);

	return (
		<DialogPrimitive.Root open={open ?? _open} onOpenChange={setOpen} {...rest}>
			<DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
			<AnimatePresence>
				{_open && (
					<DialogPrimitive.Portal key="modal" forceMount>
						<DialogPrimitive.Overlay asChild>
							<motion.div
								className="fixed inset-0 bg-neutral-950/10 backdrop-blur-xs"
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
								className="-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 flex w-[40%] transform flex-col gap-2 overflow-hidden rounded-lg bg-neutral-50 shadow-md *:p-4"
							>
								<div className="grid grid-cols-2 gap-2 border-neutral-200 border-b">
									<DialogPrimitive.Title className="text-xl">
										{title}
									</DialogPrimitive.Title>
									<DialogPrimitive.Description className="col-span-2 row-start-2 text-neutral-700 text-sm italic">
										{subtitle}
									</DialogPrimitive.Description>
									<div className="col-start-2 text-right">
										<DialogPrimitive.Close className="cursor-pointer p-1 text-neutral-500 hover:text-neutral-900">
											<Cross2Icon />
										</DialogPrimitive.Close>
									</div>
								</div>
								<div className="flex-2">{content}</div>
							</motion.div>
						</DialogPrimitive.Content>
					</DialogPrimitive.Portal>
				)}
			</AnimatePresence>
		</DialogPrimitive.Root>
	);
};

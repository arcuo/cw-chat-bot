import { useId, useState, type PropsWithChildren, type ReactNode } from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { AnimatePresence, motion } from "motion/react";

export const Tooltip = ({
	children,
	content,
	contentProps,
	...rest
}: PropsWithChildren & {
	content: ReactNode;
	contentProps?: RadixTooltip.TooltipContentProps;
} & RadixTooltip.TooltipProps) => {
	const [open, setOpen] = useState(false);
	const id = useId();

	return (
		<RadixTooltip.Provider delayDuration={400} {...rest}>
			<RadixTooltip.Root open={open} onOpenChange={setOpen}>
				<RadixTooltip.Trigger asChild onClick={() => setOpen(true)}>
					{children}
				</RadixTooltip.Trigger>
				<AnimatePresence>
					{open && (
						<RadixTooltip.Portal forceMount key={id}>
							<RadixTooltip.Content asChild {...contentProps}>
								<motion.div
									className="rounded-md border border-neutral-300 px-2 py-[1px] shadow-md"
									exit={{
										opacity: 0,
										y: 5,
										transition: {
											duration: 0.2,
											ease: [0.22, 1, 0.36, 1],
										},
									}}
									initial={{
										opacity: 0,
										y: 5,
									}}
									animate={{
										opacity: 1,
										y: 0,
										transition: {
											duration: 0.2,
											ease: [0.22, 1, 0.36, 1],
										},
									}}
								>
									{/* <RadixTooltip.Arrow className="-translate-y-[1px] fill-white" /> */}
									{content}
								</motion.div>
							</RadixTooltip.Content>
						</RadixTooltip.Portal>
					)}
				</AnimatePresence>
			</RadixTooltip.Root>
		</RadixTooltip.Provider>
	);
};

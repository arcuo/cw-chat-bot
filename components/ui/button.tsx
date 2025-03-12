import { cn } from "@/lib/utils";
import { Loader } from "./loader";
import { motion } from "motion/react";
import {
	useEffect,
	useRef,
	type ComponentProps,
	type PropsWithChildren,
} from "react";
import * as Slot from "@radix-ui/react-slot";
import Link from "next/link";

export const MotionLink = motion.create(Link);

export function LinkButton({
	children,
	className,
	disabled,
	icon,
	...rest
}: React.ComponentProps<typeof MotionLink> &
	ComponentProps<typeof ButtonStyle>) {
	return (
		<ButtonStyle icon={icon} disabled={disabled} className={className}>
			<MotionLink {...rest}>{children}</MotionLink>
		</ButtonStyle>
	);
}

const ButtonStyle = ({
	children,
	disabled,
	icon,
	className,
}: PropsWithChildren & {
	disabled?: boolean;
	icon?: boolean;
	className?: string;
}) => {
	return (
		<Slot.Root
			className={cn(
				"cursor-pointer rounded-md border border-neutral-300 bg-neutral-50/20 p-2 shadow-md",
				{
					"pointer-events-none opacity-50": disabled,
					"flex size-8 items-center justify-center p-[5px] *:size-full": icon,
				},
				className,
			)}
			// @ts-ignore
			whileHover={{ scale: 1.05 }}
			whileTap={{
				scale: 0.95,
				backgroundColor:
					"color-mix(in oklab, var(--color-neutral-50) 10%, transparent)",
			}}
		>
			{children}
		</Slot.Root>
	);
};

export function Button({
	children,
	className,
	loading,
	onHoldDown,
	disabled,
	icon,
	...props
}: React.ComponentProps<typeof motion.button> & {
	loading?: boolean;
	onHoldDown?: () => void;
} & ComponentProps<typeof ButtonStyle>) {
	// Hold down button
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	function stopInterval() {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	}

	function startInterval(f: () => void) {
		if (intervalRef.current) return;
		intervalRef.current = setInterval(f, 100);
	}

	// Cleanup interval on unmount
	useEffect(() => stopInterval, []);

	return (
		<ButtonStyle icon={icon} disabled={disabled} className={className}>
			<motion.button
				type="button"
				onMouseDown={
					onHoldDown
						? () => {
								startInterval(onHoldDown);
							}
						: undefined
				}
				onMouseUp={
					onHoldDown
						? () => {
								stopInterval();
							}
						: undefined
				}
				{...props}
			>
				{loading ? <Loader className="h-4" /> : children}
			</motion.button>
		</ButtonStyle>
	);
}

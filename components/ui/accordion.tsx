"use client";

import { cn } from "@/lib/utils";
import * as RadixAccordion from "@radix-ui/react-accordion";
import { ChevronUpIcon } from "lucide-react";
import {
	AnimatePresence,
	LayoutGroup,
	motion,
	type Variants,
} from "motion/react";
import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ComponentProps,
	type ReactNode,
} from "react";

const AccordionContext = createContext<string[]>([]);
const useOpenItems = () => useContext(AccordionContext);

const AccordionRoot = ({
	children,
	className,
	value,
	onValueChange,
	...props
}: Omit<RadixAccordion.AccordionMultipleProps, "type" | "asChild">) => {
	const [_value, setValue] = useState<string[]>([]);
	return (
		<AccordionContext.Provider value={value ?? _value}>
			<LayoutGroup>
				<RadixAccordion.Root
					className={cn(
						"flex flex-col rounded-md border border-neutral-200 shadow-xs",
						className,
					)}
					value={value ?? _value}
					onValueChange={(v) => {
						setValue(v);
						onValueChange?.(v);
					}}
					type="multiple"
					asChild
					{...props}
				>
					<motion.div layout>{children}</motion.div>
				</RadixAccordion.Root>
			</LayoutGroup>
		</AccordionContext.Provider>
	);
};

const ItemOpenContext = createContext<boolean>(false);
const useItemOpen = () => useContext(ItemOpenContext);

const AccordionItem = ({
	children,
	className,
	value,
	...props
}: Omit<ComponentProps<typeof RadixAccordion.Item>, "asChild">) => {
	const values = useOpenItems();
	const [open, setOpen] = useState(values.includes(value));

	useEffect(() => {
		setOpen(values.includes(value));
	}, [values, value]);

	return (
		<ItemOpenContext.Provider value={open}>
			<RadixAccordion.Item
				value={value}
				className={cn(
					"relative mt-[1px] overflow-hidden p-2 first:mt-0 first:rounded-t-sm last:rounded-b-sm last:[&>hr]:hidden",
					className,
				)}
				{...props}
			>
				{children}
				<hr className="absolute bottom-0 left-0 w-full border-neutral-200" />
			</RadixAccordion.Item>
		</ItemOpenContext.Provider>
	);
};

const AccordionTrigger = ({
	children,
	className,
	...props
}: ComponentProps<typeof RadixAccordion.Trigger> & {
	children: ReactNode | ((props: { open: boolean }) => ReactNode);
}) => {
	const isOpen = useItemOpen();
	return (
		<RadixAccordion.Header>
			<RadixAccordion.Trigger
				className={cn(
					"flex w-full cursor-pointer items-center justify-between px-2 data-[state=open]:[&>svg]:rotate-180",
					className,
				)}
				{...props}
			>
				{typeof children === "function" ? children({ open: isOpen }) : children}
				<ChevronUpIcon className="transition-transform duration-500 ease-in-out will-change-transform" />
			</RadixAccordion.Trigger>
		</RadixAccordion.Header>
	);
};

const MotionAccordionContent = motion.create(RadixAccordion.Content);

const variants: Variants = {
	hidden: {
		height: 0,
		maskImage: "linear-gradient(white 20px, transparent 100%)",
	},
	shown: {
		height: "auto",
		maskImage: "linear-gradient(white 100%, transparent 100%)",
		transition: {
			ease: "easeInOut",
		},
	},
};

const AccordionContent = ({
	children,
	className,
	...props
}: ComponentProps<typeof MotionAccordionContent> & {
	children: ReactNode | ((props: { open: boolean }) => ReactNode);
}) => {
	const isOpen = useItemOpen();
	return (
		<AnimatePresence>
			{isOpen ? (
				<MotionAccordionContent
					key={"accordion-content"}
					forceMount
					className={"overflow-hidden"}
					initial="hidden"
					variants={variants}
					animate="shown"
					exit="hidden"
					transition={{ duration: 0.3 }}
					{...props}
				>
					<div className={cn("px-3 pt-3 leading-tight", className)}>
						{typeof children === "function"
							? children({ open: isOpen })
							: children}
					</div>
				</MotionAccordionContent>
			) : null}
		</AnimatePresence>
	);
};

export const Accordion = {
	Root: AccordionRoot,
	Item: AccordionItem,
	Trigger: AccordionTrigger,
	Content: AccordionContent,
};

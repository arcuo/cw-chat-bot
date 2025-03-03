"use client";

import { cn } from "@/lib/utils";
import { motion, type Variants } from "motion/react";
import { forwardRef } from "react";

const RootVariants: Variants = {
	hover: { y: -5, scale: 1.02, marginLeft: 4, marginRight: 4 },
};

const Root = forwardRef<
	HTMLButtonElement,
	React.ComponentProps<typeof motion.button>
>((props, ref) => {
	const { children, className, ...rest } = props;

	return (
		<motion.button
			ref={ref}
			className={cn(
				"flex cursor-pointer flex-col gap-2 rounded-lg bg-neutral-50/10 p-4 text-left shadow-md",
				className,
			)}
			whileHover="hover"
			variants={RootVariants}
			{...rest}
		>
			{children}
		</motion.button>
	);
});

const Title = ({
	className,
	...props
}: React.ComponentProps<typeof motion.h3>) => {
	return (
		<motion.h3 className={cn("font-bold text-lg", className)} {...props} />
	);
};

const Subtitle = ({
	className,
	...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
	return (
		<p className={cn("text-gray-500 text-sm italic", className)} {...props} />
	);
};

const EllipsisContent = ({className, ...props}: React.ComponentProps<typeof motion.div>) => {
	return <motion.div className={cn("my-2 line-clamp-2 text-pretty", className)} {...props} />;
};

const Content = forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
	return <div ref={ref} className="my-2" {...props} />;
});

export const Card = { Root, Title, Subtitle, Content, EllipsisContent };

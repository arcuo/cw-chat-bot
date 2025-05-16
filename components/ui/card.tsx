"use client";

import { cn } from "@/lib/utils";
import { motion, type Variants } from "motion/react";
import { forwardRef, type PropsWithChildren } from "react";

const RootVariants: Variants = {
	hover: { y: -6 },
};

const Root = forwardRef<
	HTMLButtonElement,
	PropsWithChildren<React.ComponentProps<typeof motion.button>>
>((props, ref) => {
	const { children, className, ...rest } = props;

	return (
		<motion.button
			ref={ref}
			className={cn(
				"flex cursor-pointer flex-col gap-2 rounded-lg border border-neutral-200 bg-neutral-50/10 p-4 text-left shadow-md",
				className,
			)}
			whileHover="hover"
			whileTap={{ scale: 0.99 }}
			variants={RootVariants}
			{...rest}
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

			{children}
		</motion.button>
	);
});

const Title = ({
	className,
	...props
}: React.ComponentProps<typeof motion.h3>) => {
	return <motion.h3 className={cn(" text-lg", className)} {...props} />;
};

const Subtitle = ({
	className,
	...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
	return (
		<p className={cn("text-gray-500 text-sm italic", className)} {...props} />
	);
};

const EllipsisContent = ({
	className,
	...props
}: React.ComponentProps<typeof motion.div>) => {
	return (
		<motion.div
			className={cn("my-2 line-clamp-2 text-pretty", className)}
			{...props}
		/>
	);
};

const Content = forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
	return <div ref={ref} className="my-2" {...props} />;
});

export const Card = { Root, Title, Subtitle, Content, EllipsisContent };

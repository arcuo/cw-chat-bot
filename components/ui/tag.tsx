import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useLayoutEffect, useState, type HtmlHTMLAttributes } from "react";
import useMeasure from "react-use-measure";

export const Tag = ({
	className,
	...props
}: HtmlHTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn(
			"h-fit w-fit whitespace-nowrap rounded-sm bg-neutral-900/10 px-2 py-1 text-xs",
			className,
		)}
		{...props}
	/>
);

export const TagsCarousel = ({
	tags,
	parentWidth,
}: {
	tags: string[];
	parentWidth: number;
}) => {
	const [ref, { width }] = useMeasure();
	const [shouldScroll, setShouldScroll] = useState(false);

	useLayoutEffect(() => {
		if (parentWidth < width) {
			setShouldScroll(true);
		}
	}, [parentWidth, width]);

	return (
		<motion.div
			ref={ref}
			className="flex gap-2"
			variants={{
				hover: shouldScroll
					? {
							x: [0, -width / 2 - 8],
							transition: {
								ease: "linear",
								duration: 25,
								repeat: Number.POSITIVE_INFINITY,
								repeatType: "loop",
								repeatDelay: 0,
							},
						}
					: {},
			}}
			initial={{ x: 0, transition: { duration: 0.2 } }}
		>
			{[...tags, ...(shouldScroll ? tags : [])].map((t, i) => (
				<Tag key={i}>{t}</Tag>
			))}
		</motion.div>
	);
};

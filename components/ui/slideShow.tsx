"use client";

import { atom, useAtom } from "jotai";
import {
	AnimatePresence,
	motion,
	type Variant,
	type Variants,
} from "motion/react";
import React, { useEffect, type PropsWithChildren } from "react";

const navigationIndex = atom(0);

type Direction = "left" | "right";

const defaultsVariants = {
	initial: (direction: Direction) => ({
		opacity: 0,
		x: direction === "right" ? 100 : -100,
	}),
	hidden: (direction: Direction) => ({
		opacity: 0,
		x: direction === "left" ? -100 : 100,
	}),
	visible: {
		opacity: 1,
		x: 0,
	},
} satisfies Variants;

const SlideShow = ({
	children,
	index,
	direction,
	animations = defaultsVariants,
}: PropsWithChildren<{
	index: number;
	direction?: Direction;
	animations?: {
		initial: Variant;
		hidden: Variant;
		visible: Variant;
	};
}>) => {
	const [_index, setIndex] = useAtom(navigationIndex);

	useEffect(() => {
		setIndex(index);
	}, [index]);

	return (
		<AnimatePresence
			initial={false}
			mode="popLayout"
			custom={direction ?? "left"}
		>
			{React.Children.map(children, (child, i) => {
				return (
					_index === i && (
						<motion.div
							variants={animations}
							key={i}
							initial={direction === "right" ? "initial" : "hidden"}
							animate={"visible"}
							exit={"hidden"}
							transition={{ duration: 0.5, type: "spring" }}
						>
							{child}
						</motion.div>
					)
				);
			})}
		</AnimatePresence>
	);
};

export { SlideShow };

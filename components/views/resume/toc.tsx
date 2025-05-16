"use client";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { motion } from "motion/react";
import { selectedElementEd, elements } from "./elements";
import { sectionViewStore } from "./useSectionsInView";
import { useMemo } from "react";
import { PinTopIcon } from "@radix-ui/react-icons";
import { navVariants } from "../main";

export const TOC = ({ className }: { className?: string }) => {
	const [selectedElementId, setSelectedElementId] = useAtom(selectedElementEd);

	const liClass = useMemo(
		() =>
			cn(
				"[&>a]:relative [&>a]:flex [&>a]:items-center [&>a]:gap-3  [&>a]:px-4 [&>a]:py-2 border-neutral-300 border-b transition-all last:border-none",
			),
		[],
	);

	return (
		<motion.nav
			className={cn(
				"w-fit rounded-xl border border-neutral-200 bg-white shadow-md",
				className,
			)}
			initial="navHidden"
			animate="navShown"
			variants={navVariants}
		>
			<ul>
				<li className={liClass}>
					<a href="#header">
						<PinTopIcon /> Top
					</a>
				</li>
				{Object.entries(elements).map(([id, { title, icon: Icon }]) => {
					const isSelected = id === selectedElementId;
					return (
						<li key={id} className={cn(liClass, { "font-bold": isSelected })}>
							<a
								href={`#${id}`}
								onClick={() => {
									sectionViewStore.disabled = true;
									setSelectedElementId(id as keyof typeof elements);
									setTimeout(() => {
										sectionViewStore.disabled = false;
									}, 1000);
								}}
							>
								{isSelected && (
									<motion.div
										layoutId="toc-dot"
										className="-left-[5px] absolute"
										// transition={{ ease: "easeInOut", duration: 0.6 }}
									>
										{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
										<svg
											className="size-[22px] border-none fill-neutral-300"
											viewBox="0 0 322.39 557.21"
										>
											<path
												className="shadow-2xl"
												d="M0,0v557.21c0-55.06,27.62-103.65,69.75-132.74,54.1-26,91.45-81.32,91.45-145.37,0-56.68-29.25-106.52-73.49-135.26-1.01-.66-2.03-1.31-3.06-1.95-2.75-1.48-5.45-3.05-8.1-4.68C30.61,108.8,0,57.98,0,0Z"
											/>
										</svg>
									</motion.div>
								)}
								<Icon className={cn("z-10 size-4 transition-colors")} />

								{title}
							</a>
						</li>
					);
				})}
			</ul>
		</motion.nav>
	);
};

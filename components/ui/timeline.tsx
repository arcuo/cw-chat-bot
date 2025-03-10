"use client";

import { cn } from "@/lib/utils";
import { HeartIcon } from "@radix-ui/react-icons";
import { motion } from "motion/react";
import {
	useMemo,
	type CSSProperties,
	type HTMLAttributes,
	type ReactNode,
} from "react";
import { Popup } from "./popup";
import { Hourglass } from "lucide-react";

type TimelineProps = {
	max: number;
	min: number;
	rows: {
		heading: ReactNode;
		entries: Record<
			number,
			{
				start: number;
				end: number;
				content: ReactNode;
				color: CSSProperties["backgroundColor"];
				textColor?: CSSProperties["color"];
				icon: ReactNode;
			}
		>;
	}[];
};

export const Timeline = ({
	children,
	className,
	max,
	min,
	rows,
	...props
}: HTMLAttributes<HTMLDivElement> & TimelineProps) => {
	const rowGridColumn = `span ${max - min + 1}`;

	return (
		<div className="my-10 flex flex-col gap-5">
			<div
				role="grid"
				className={cn("grid w-full", className)}
				style={{
					gridTemplateColumns: `min-content repeat(${max - min + 1}, minmax(0, 1fr))`,
				}}
				{...props}
			>
				{/* Header row */}
				<div
					role="row"
					className="grid grid-cols-subgrid rounded-md border border-neutral-200 bg-white font-bold text-[.8rem] uppercase shadow-xs"
					style={{
						gridColumn: `span ${max - min + 2}`,
					}}
				>
					<div className="flex items-center justify-start px-4 py-1">
						Experience
					</div>
					{Array.from({ length: max - min + 1 }, (_, i) => (
						<div
							role="gridcell"
							key={i}
							className="flex items-center justify-start border-neutral-200/60 border-l px-2 py-1"
						>
							{min + i}
						</div>
					))}
				</div>

				{/* Vertical row headings */}
				{rows?.map(({ heading }, i) => (
					<div
						role="rowheader"
						key={`row-header-${i}`}
						className={cn("whitespace-nowrap px-5 py-2 font-bold text-sm", {
							"mt-3": i === 0,
						})}
						style={{ gridRowStart: i + 2 }}
					>
						{heading}
					</div>
				))}

				{/* Body subgrid */}
				<div
					role="presentation"
					className="mt-3 grid border-collapse grid-cols-subgrid grid-rows-subgrid overflow-hidden rounded-md border border-neutral-200 shadow-xs"
					style={{
						gridColumn: rowGridColumn,
						gridRow: `span ${rows?.length} / span ${rows?.length}`,
					}}
				>
					{rows.map(({ entries }, i) => (
						<div
							role="row"
							key={`row-${i}`}
							className={cn("relative grid grid-cols-subgrid text-xs", {
								"[&>div]:border-t-0": i === 0,
							})}
							style={{ gridColumn: rowGridColumn }}
						>
							{Array.from({ length: max - min + 1 }, (_, j) => {
								const entry = entries[min + j];
								return (
									<div
										role="gridcell"
										key={`cell-${i}-${j}`}
										className="border border-neutral-200/60 border-r-0 border-b-0 px-[2px] first:border-l-0"
									>
										{entry && (
											<Popup
												content={
													<div className="flex flex-col items-center justify-center gap-5 p-5">
														{" "}
														Info incoming! <Hourglass />
													</div>
												}
											>
												<motion.button
													whileHover={{ x: 4 }}
													whileTap={{ scale: 0.99 }}
													className="-translate-y-1/2 absolute top-1/2 flex cursor-pointer select-none gap-4 whitespace-nowrap rounded-full px-3 py-1 font-bold"
													style={{
														width: `calc(${((entry.end - entry.start) / (max - min + 1)) * 100}% - 4px)`,
														background: `hsl(from ${entry.color} h s l / .75)`,
														color: entry.textColor,
													}}
												>
													<div
														style={{
															color: `lch(from ${entry.color} calc(l - 50) c h)`,
														}}
													>
														{entry.icon}
													</div>{" "}
													<div className="overflow-hidden text-ellipsis">
														{entry.content}
													</div>
												</motion.button>
											</Popup>
										)}
									</div>
								);
							})}
						</div>
					))}
				</div>
			</div>
			<span className="ml-27 font-bold text-neutral-500 text-sm">Click each timeline for more info!</span>
		</div>
	);
};

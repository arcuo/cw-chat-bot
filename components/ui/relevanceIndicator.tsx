"use client";
import { cn } from "@/lib/utils";
import { Tooltip } from "./tooltip";

export type RelevanceScore = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export const RelevanceIndicator = ({ score }: { score: RelevanceScore }) => {
	const color =
		score >= 8
			? "bg-green-700"
			: score >= 6
				? "bg-green-600"
				: score >= 3
					? "bg-amber-500"
					: "bg-rose-700";

	const dotClass = cn("size-[6px] rounded-full bg-neutral-300");

	return (
		<Tooltip content="How relevant is the skill to the prompt used to create the resume">
			<div className="flex gap-1">
				<div
					className={cn(dotClass, {
						[color]: score >= 1,
					})}
				/>
				<div
					className={cn(dotClass, {
						[color]: score >= 2,
					})}
				/>
				<div
					className={cn(dotClass, {
						[color]: score >= 3,
					})}
				/>
				<div
					className={cn(dotClass, {
						[color]: score >= 4,
					})}
				/>

				<div
					className={cn(dotClass, {
						[color]: score >= 5,
					})}
				/>

				<div
					className={cn(dotClass, {
						[color]: score >= 6,
					})}
				/>

				<div
					className={cn(dotClass, {
						[color]: score >= 7,
					})}
				/>

				<div
					className={cn(dotClass, {
						[color]: score >= 8,
					})}
				/>

				<div
					className={cn(dotClass, {
						[color]: score >= 9,
					})}
				/>

				<div
					className={cn(dotClass, {
						[color]: score >= 10,
					})}
				/>
			</div>
		</Tooltip>
	);
};

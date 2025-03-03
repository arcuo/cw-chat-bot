"use client";
import { cn } from "@/lib/utils";

type Score = 1 | 2 | 3 | 4;

const dotClass = cn("size-2 rounded-full bg-neutral-500");

export const RelevanceIndicator = ({ score }: { score: Score }) => {
	const color =
		score >= 3 ? "bg-green-700" : score >= 2 ? "bg-amber-500" : "bg-rose-700";

	return (
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
					[color]: score === 4,
				})}
			/>
		</div>
	);
};

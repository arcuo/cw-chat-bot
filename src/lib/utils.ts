import { clsx, type ClassValue } from "clsx";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function useElementSize(
	ref: React.RefObject<HTMLElement | null>,
	onObserveChange?: (rect: DOMRectReadOnly | null) => void,
) {
	const [size, setSize] = useState<{
		height: number;
		width: number;
		x: number;
		y: number;
	} | null>(ref.current?.getBoundingClientRect() ?? null);

	useEffect(() => {
		if (!ref.current) return;

		const observer = new ResizeObserver(() => {
			const rect = ref.current?.getBoundingClientRect() ?? null;
			setSize(rect);
			onObserveChange?.(rect);
		});
		observer.observe(ref.current);
		return () => observer.disconnect();
	}, [ref]);

	return { ...size };
}

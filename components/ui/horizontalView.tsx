"use client";
import { cn } from "@/lib/utils";
import { motion, useMotionValue } from "motion/react";
import {
	createContext,
	useContext,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
	type PropsWithChildren,
} from "react";

const DraggingContext = createContext<boolean>(false);
export const useDragging = () => useContext(DraggingContext);

/** Component that scrolls the x-axis when hovered */
export const HorizontalView = ({
	children,
	className,
	// TODO: add active scroll
	active,
	...rest
}: PropsWithChildren<React.ComponentProps<typeof motion.div>> & {
	active?: boolean;
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [left, setLeft] = useState(0);
	const x = useMotionValue(0);

	const handleResize = () => {
		if (!containerRef.current) return;
		setLeft(containerRef.current.scrollWidth - document.body.clientWidth);
		x.set(0);
	};

	useLayoutEffect(() => {
		handleResize();
		const controller = new AbortController();
		window.addEventListener("resize", handleResize, {
			signal: controller.signal,
		});
		return () => controller.abort();
	});

	const thereIsMore = useMemo(() => left > 0, [left]);

	const [dragging, setDragging] = useState(false);

	return (
		<div className="relative my-10">
			<div
				className="-ml-15 flex w-[calc(100vw-10px)] flex-col gap-4 overflow-hidden px-15 py-5"
				data-name="scroll-container"
			>
				<motion.div
					ref={containerRef}
					data-name="scroll-inner"
					className={cn("flex gap-2", className)}
					drag={thereIsMore ? "x" : undefined}
					dragElastic={0.2}
					dragTransition={{
						bounceDamping: 18,
						power: 0.2,
						timeConstant: 200,
						modifyTarget: (target) => Math.round(target / 200) * 200,
					}}
					dragConstraints={{
						left: -(left + 150),
						right: 0,
					}}
					onDrag={() => {
						setTimeout(() => setDragging(true), 50);
					}}
					onDragEnd={() => {
						setTimeout(() => setDragging(false), 150);
					}}
					style={{ x }}
					{...rest}
				>
					<DraggingContext.Provider value={dragging}>
						{children}
					</DraggingContext.Provider>
				</motion.div>
			</div>
			{thereIsMore && (
				<div className="-top-5 absolute right-5 font-bold text-neutral-700/70 text-sm">
					Drag for more ⇨
				</div>
			)}
		</div>
	);
};

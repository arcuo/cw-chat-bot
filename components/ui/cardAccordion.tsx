import { Accordion } from "./accordion";
import { useState, useLayoutEffect, type JSX } from "react";

export function CardAccordion<T>(props: {
	max?: number;
	elements: T[];
	renderCard: (element: T) => JSX.Element;
}) {
	const { max = 3, elements, renderCard } = props;
	const [n, setN] = useState<number>(max);

	useLayoutEffect(() => {
		const controller = new AbortController();
		let main = document.getElementById("main-container");

		const handleElementAmount = () => {
			if (!main) main = document.getElementById("main-container");
			if (!main) return;
			if (main.clientWidth < 768) {
				setN(1);
			} else if (main.clientWidth < 1280) {
				setN(2);
			} else {
				setN(max);
			}
		};

		handleElementAmount();
		window.addEventListener("resize", handleElementAmount, {
			signal: controller.signal,
		});
		return () => controller.abort();
	});

	return (
		<Accordion.Root className="border-0 shadow-none">
			<Accordion.Item value="skills">
				<div
					className="mt-8 grid items-center gap-6"
					style={{
						gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`,
					}}
				>
					{elements.slice(0, n).map(renderCard)}
				</div>
				<Accordion.Content className="mt-6 p-0">
					<div
						className="mb-6 grid items-center gap-6"
						style={{
							gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`,
						}}
					>
						{elements.slice(n).map(renderCard)}
					</div>
				</Accordion.Content>
				<Accordion.Trigger className="mt-5 flex w-fit items-center gap-2 rounded-md border border-neutral-100 px-3 py-1 shadow-md transition-transform duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.95]">
					{/* @ts-ignore */}
					{({ open }) => (open ? "Less" : "More")}
				</Accordion.Trigger>
			</Accordion.Item>
		</Accordion.Root>
	);
}

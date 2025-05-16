import type { ReactNode } from "react";
import { Popup } from "./popup";
import { Button } from "./button";

export const FeatureTag = ({
	description,
	title,
	todo,
}: { description: ReactNode; title: string; todo?: boolean }) => {
	return (
		<Popup content={description}>
			<Button className="flex items-center gap-2 px-2 py-1 text-sm">
				{title}
				{todo && <span className="text-neutral-500 text-xs"> (TODO)</span>}
			</Button>
		</Popup>
	);
};

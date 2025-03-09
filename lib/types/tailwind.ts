export type TailwindColorTypes =
	| "red"
	| "orange"
	| "amber"
	| "yellow"
	| "lime"
	| "green"
	| "emerald"
	| "teal"
	| "cyan"
	| "sky"
	| "blue"
	| "indigo"
	| "violet"
	| "purple"
	| "fuchsia"
	| "pink"
	| "rose"
	| "slate"
	| "gray"
	| "zinc"
	| "neutral"
	| "stone";

export type TailwindColorValues = "50" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | "950";

export type TailwindColor = `${TailwindColorTypes}-${TailwindColorValues}`;
export type TextTailwindColor = `text-${TailwindColorTypes}-${TailwindColorValues}`;

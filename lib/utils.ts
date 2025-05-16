import { customAlphabet } from "nanoid";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Color, { type ColorLike } from "color";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789");

const levels = {
	A: 4.5,
	AA: 4.5,
	AAA: 7,
};

export const contrast = (
	c: string,
	choices: string[] = ["white", "black"],
	level: "A" | "AA" | "AAA" = "AA",
) => {
	const color = Color(c);
	const requiredContrast = levels[level];

	for (const choice of choices) {
		const choiceColor = Color(choice);
		const contrast = color.contrast(choiceColor);
		if (contrast >= requiredContrast) {
			return choice;
		}
	}

	return choices[0];
};

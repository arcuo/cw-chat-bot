import type { Base } from "../types/base";
import { type Project, projects } from "./projects";

export type Skill = Base & {
	/** Tags for the skill */
	tags: string[];
	/** Related projects */
	projects?: (Project | string)[]; // TODO link to projects
};

export const skills = {
	senior: {
		title: "Senior Programmer",
		subtitle: "No fear of new languages or large complex codebases",
		content:
			'I am what I would call a "curious programmer" and I have a lot of experience with diving into codebases. I\'m eager to learn and to understand the project I am working with and to contribute meaningfully to it. I love to solve the puzzles that debugging and troubleshooting can bring.',
		tags: ["Curiousity", "Programming", "Rust", "Typescript", "Python"],
		projects: [projects.markingTool, "Ruff python linter"],
	},
	frontender: {
		title: "Frontend Developer",
		subtitle: "8 years of experience in frontend development",
		content:
			"I have a strong background in frontend development. I have developed frontend applications using everything from React, to AngularJS and JQuery. I have a strong interest in the developments that are happening in the frontend and space and keep myself updated by reading and trying out the latest frameworks and trends. In frontend development.",
		tags: [
			"Frontend",
			"React",
			"Next.js",
			"TypeScript",
			"AngularJS",
			"Astro",
			"TailwindCSS",
			"Radix UI",
			"Vite",
		],
		projects: [projects.markingTool, "Resume", projects.flowUI],
	},
	types: {
		title: "TypeScript/Rust Developer",
		subtitle: "Strong affinity for type safe development",
		content:
			"As a developer, I have a strong affinity for writing maintainable code. In this regard, I am a strong advocate for type safe development which ensures that the code I write is maintainable for me and other developers.",
		tags: ["Typescript", "Rust", "Maintainability"],
		projects: [projects.sdith, "Threshold ECDSA signatures", projects.flowUI],
	},
} satisfies Record<string, Skill>;

// TODO: GIT workflows, Accessibility, Fullstack,

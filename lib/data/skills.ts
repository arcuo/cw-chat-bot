import type { Base } from "../types/base";
import { type Project, projects } from "./projects";

export type Skill = Base & {
	/** Tags for the skill */
	tags: string[];
	/** Related projects */
	projects?: Project[]; // TODO link to projects
};

export const skills = {
	senior: {
		title: "Senior Programmer",
		subtitle: "No fear of new languages or large complex codebases",
		content:
			'I am what I would call a "curious programmer" and I have a lot of experience with diving into codebases. I\'m eager to learn and to understand the project I am working with and to contribute meaningfully to it. I love to solve the puzzles that debugging and troubleshooting can bring.',
		tags: ["Curiousity", "Programming", "Rust", "Typescript", "Python"],
		projects: [projects.markingTool, projects.sdith, projects.wiseflow], // TODO Ruff python linter
	},
	frontender: {
		title: "Frontend Developer",
		subtitle: "8 years of experience in frontend development",
		content:
			"I have a strong background in frontend development. I have developed frontend applications using everything from React, to AngularJS and JQuery. I have a strong interest in the developments that are happening in the frontend and space and keep myself updated by reading and trying out the latest frameworks and trends. In frontend development.",
		tags: [
			"Frontend",
			"React",
			"TypeScript",
			"AngularJS",
			"CSS",
			"TailwindCSS",
		],
		projects: [projects.markingTool, projects.flowUI], // TODO Resume
	},
	types: {
		title: "TypeScript/Rust Developer",
		subtitle: "Strong affinity for type safe development",
		content:
			"As a developer, I have a strong affinity for writing maintainable code. In this regard, I am a strong advocate for type safe development which ensures that the code I write is maintainable for me and other developers. I love to work in languages, like Rust and Typescript that ensure type safety and I love to develop interfaces that provide safe surfaces for developers to interact with my code.",
		tags: ["Typescript", "Rust", "Maintainability"],
		projects: [projects.sdith, projects.flowUI], // TODO Threshold ECDSA signatures
	},
	react: {
		title: "React Developer",
		subtitle: "I've created React applications in all shapes and sizes",
		content:
			"While developing frontend applications, I have been introduced to many different problems and problem solutions. Most of the time, I've been solving them using React. I've worked in both single page applications and frameworks like Next.js and through my work and free time I've developed an intuition for React. This allows me to develop performant, accessible, and maintainable frontend applications.",
		tags: [
			"Frontend",
			"React",
			"Next.js",
			"TypeScript",
			"@tanstack/react-query",
			"SPA",
			"SSR",
			"Framer motion",
			"Radix UI",
			"Vite",
		],
		projects: [projects.markingTool, projects.flowUI, projects.wiseflow],
	},
	git: {
		title: "Git VC and Github Workflows",
		subtitle: "I love git and version control!",
		content:
			"I've always been using git and I often develop personal scripts and tools that I use in my daily life. In order to handle multiple projects and micro frontends, I've developed many Github Actions to automate CI/CD pipelines and publishing. I love to automate workflows and improve developer experience for me and my teammates.",
		tags: ["Git", "Github", "Version Control", "DevEx", "Github Actions"],
	},
	accessibility: {
		title: "WCAG Accessibility",
		subtitle: "Compliant and accessible frontend UI",
		content:
			"I have much experience with WCAG accessibility and I always develop accessible frontend UI's. For one, this website is fully WCAG AAA compliant. In my professional work I've developed UI libraries that support developing fully accessible frontend applications, either through libraries like Radix UI or manually through the WCAG Aria Patterns.",
		tags: ["Accessibility", "WCAG", "Component libraries", "UI"],
		projects: [projects.flowUI, projects.wiseflow], // TODO Resume
	},
	fullstack: {
		title: "Fullstack Developer",
		subtitle: "I've worked with a variety of technologies",
		content:
			"As part of a smaller development team, I've been forced to work with a variety of facets of web development. This has allowed me to dip my toes in both Frontend and Backend. I've debugged and developed REST API's with Golang and GraphQL. Developed PHP templating and REST endpoints.",
		tags: [
			"Fullstack",
			"Backend",
			"Fullstack",
			"Golang",
			"Rest",
			"GraphQL",
			"PHP",
		],
		projects: [projects.wiseflow, projects.markingTool],
	},
} satisfies Record<string, Skill>;

// TODO: ,

import type { Base } from "../types/base";

export type Project = Base & {
	id: string;
	link?: { href: string; text: string };
	productDescription?: string;
	tags: string[];
};

export const projects = {
	wiseflow: {
		id: "wiseflow",
		title: "WISEflow - An end-to-end digital assessment platform",
		subtitle: "A platform for managing, grading and attending exams",
		productDescription:
			"WISEflow manages the complete assessment and feedback lifecycle across a wide range of assessment types and formats. Comes with tools to make feedback easier and more consistent, such as multi-level annotations and rubrics, which enhances students' learning and satisfaction.",
		content:
			"For 8 years I helped deliver the WISEflow digital assessment platform. I was responsible for developing the frontend together with a team of developers. ...",
		tags: [
			"EdTech",
			"React",
			"Golang",
			"Frontend",
			"AngularJS",
			"JQuery",
			"Micro frontends",
		],
		link: { href: "https://uniwise.eu/about-wiseflow", text: "Uniwise Website" },
	},
	sdith: {
		id: "sdith",
		title: "SDitH - Post-Quantum Digital Signature Protocol in Rust",
		subtitle:
			"Rust implementation of the NIST Post-Quantum Signature Scheme contender Syndrome Decoding in the Head (SDitH)",
		productDescription:
			"A Master thesis project involving the implementation of a post-quantum digital signature protocol in Rust. The project delivered a working post-quantum secure signature scheme CLI and Rust crate for the scheme along with a report on the theoretical background and implementation of the protocol.",
		content:
			"As a Computer Science master's student I focused on Cryptography. Given my technical skills and interests it was a great opportunity to work on a project that involved the implementation of a post-quantum digital signature protocol in Rust. The project gave me the opportunity to learn about the implementation of underlying cryptographic protocols like Secret Sharing, MPC and Code-based cryptography.",
		tags: [
			"Rust",
			"Cryptography",
			"Post-Quantum",
			"Master's Thesis",
			"Computer Science",
		],
		link: {text: "Github", href: "https://github.com/Mactherobot/sdith-rust/blob/main/sdith/README.md"},
	},
	markingTool: {
		id: "markingTool",
		title: "WISEflow Marking Tool",
		subtitle:
			"Major contributor to the development of the WISEflow marking tool",
		productDescription:
			"A SPA web application that allows assessors to mark, annotate and grade student exams. The tool supports 50+ educational institutions around the world and processes over 1,000,000 assessments per year.",
		content:
			"As a senior developer in the organisation I took a major part in developing and maintaining the WISEflow marking tool from the frontend side. In collaboration with the team we develpoed a micro frontend SPA in React and took use of modern tools like Tanstack/React-Query and PDFtron.",
		tags: ["React", "TypeScript", "PDFtron", "SPA", "EdTech"],
		link: {href: "https://wiseflow.zendesk.com/hc/en-gb/articles/4407007191058-Using-the-Marking-Tool", text: "Documentation"},
	},
	flowUI: {
		id: "flowUI",
		title: "React Flow UI Component library",
		subtitle: "Contributor and maintainer of the Flow UI component library",
		productDescription:
			"A company-wide UI library for React with a focus on accessibility and developer experience. We utilised libraries like Radix UI and Vitest to provide a WCAG compliant and robust UI.",
		content:
			"As a developer and Frontend Tech lead I worked both as a contributor and administrator of the UI component library used by the WISEflow React frontend. I was responsible for developing well designed, accessible and reusable components to be used in the development of modern parts of WISEflow. I took a leadership position in driving the direction of the library and handling the release structure",
		tags: ["React", "Radix UI", "WCAG", "Vitest"],
	},
} satisfies Record<string, Project>;

// TODO: ECDSA, BHLM in R, ThreeJS, RAG AI, DevEx scripts, Ruff linter project

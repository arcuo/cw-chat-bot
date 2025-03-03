import type { Base } from "../types/base";

export type Project = Base & {
	id: string;
	link?: string;
	productDescription?: string;
	tags: string[];
};

export const projects = {
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
		link: "https://wiseflow.zendesk.com/hc/en-gb/articles/4407007191058-Using-the-Marking-Tool",
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
		link: "https://github.com/Mactherobot/sdith-rust/blob/main/sdith/README.md",
	},
} satisfies Record<string, Project>;

// TODO: ECDSA, BHLM in R, ThreeJS, RAG AI, DevEx scripts, Ruff linter project

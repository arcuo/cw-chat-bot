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
		content: [
			"I'm a \"curious programmer\" at heart, and I've spent a lot of time digging into different codebases. I'm always eager to learn and really understand the projects I'm working on so I can contribute in a meaningful way. I especially love the problem-solving aspect of debugging and troubleshooting - it's like a puzzle I can't wait to solve!",
		],
		tags: ["Curiousity", "Programming", "Rust", "Typescript", "Python"],
		projects: [
			projects.markingTool,
			projects.sdith,
			projects.wiseflow,
			projects.bhlm,
			projects.ecdsa,
			projects.voting,
		], // TODO Ruff python linter
	},
	frontender: {
		title: "Frontend",
		subtitle: "8 years of experience in frontend development",
		content: [
			"My expertise lies in frontend development, where I have cultivated a robust skillset through the creation of applications utilizing a spectrum of technologies, including React, AngularJS, and jQuery. I maintain a keen interest in the evolving landscape of frontend technologies, diligently tracking emerging frameworks and trends through continuous learning and experimentation.",
			"In addition to feature development, I have experience with deployment configurations using tools like Vite, Rspack, and esbuild. I find these aspects of the frontend pipeline fascinating and enjoy exploring their capabilities.",
			"Furthermore, I am proficient in testing methodologies, with practical experience using Vitest for both unit and component testing, as well as the Testing Library.",
		],
		tags: [
			"Frontend",
			"React",
			"TypeScript",
			"AngularJS",
			"CSS",
			"TailwindCSS",
		],
		projects: [projects.markingTool, projects.flowUI, projects.wiseflow], // TODO Resume
	},
	leadership: {
		title: "Tech lead",
		subtitle: "I lead a frontend community across multiple feature teams",
		content: [
			"As a Frontend Tech Lead I had to ensure that the frontend community developed its skills and worked towards a common knowledge base, conventions and best practices. I was responsible for holding regular frontend architecture discussions and workshops to discuss the latest trends and help the community collectively decide on the best architecture for our stack.",
			"I took part in regular meetings with other teams leaders and tech leads to discuss maintenance drives and organise the direction of the development team at UNIwise.",
		],
		tags: ["Leadership", "Frontend", "Architecture", "Planning"],
		projects: [projects.techlead],
	},
	types: {
		title: "TypeScript/Rust",
		subtitle: "Strong affinity for type safe development",
		content: [
			"As a software developer, I prioritize writing maintainable and robust code above all else. I am a strong proponent of type-safe development practices, as they significantly enhance code maintainability and reduce the likelihood of runtime errors. Type safety provides a safety net, ensuring that code behaves predictably and is easier to reason about, both for myself and for other developers who may work on the codebase in the future.",
			"I particularly enjoy working with languages like Rust and TypeScript, which offer strong type systems and enable me to enforce contracts at compile time. I find great satisfaction in designing well-defined and type-safe interfaces that provide clear and safe entry points for developers interacting with my code. This approach promotes modularity, reduces coupling, and ultimately leads to more reliable and maintainable software systems. I believe that investing in type safety upfront saves significant time and effort in the long run by preventing bugs and simplifying the debugging process.",
		],
		tags: ["Typescript", "Rust", "Maintainability"],
		projects: [projects.sdith, projects.flowUI, projects.ecdsa], // TODO Threshold ECDSA signatures
	},
	react: {
		title: "React",
		subtitle: "I've created React applications in all shapes and sizes",
		content: [
			"During my time developing frontend applications, I've encountered a diverse range of challenges, and I've consistently sought out effective solutions. React has been my primary tool for tackling these problems. I've worked extensively with React in both single-page applications and within frameworks like Next.js. This experience, combined with dedicated learning in my free time, has given me a strong intuition for React's inner workings.",
			"I leverage this understanding to build frontend applications that are not only performant and maintainable but also highly accessible. I believe that accessibility is a crucial aspect of modern web development, and I strive to create inclusive user experiences for everyone. By staying up-to-date with the latest best practices and patterns in the React ecosystem, I can deliver high-quality frontend solutions that meet the needs of both users and developers.",
		],
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
		title: "Git and Github Workflows",
		subtitle: "I love git and version control!",
		content: [
			"I am a proficient user of Git for version control and routinely develop personal scripts and tools to streamline my daily tasks. Recognizing the complexities of managing multiple projects and micro-frontends, I have created numerous GitHub Actions to automate CI/CD pipelines and the publishing process. I am passionate about automating workflows and enhancing the developer experience, both for myself and my teammates, as I believe it significantly increases productivity and reduces the potential for errors.",
		],
		tags: ["Git", "Github", "Version Control", "DevEx", "Github Actions"],
	},
	accessibility: {
		title: "WCAG Accessibility",
		subtitle: "Compliant and accessible frontend UI",
		content: [
			"I have extensive experience with Web Content Accessibility Guidelines (WCAG) and consistently prioritize the development of accessible frontend user interfaces. As a testament to this, this very website is fully compliant with WCAG AA standards.",
			"In my professional endeavors, I have developed UI libraries that empower developers to create fully accessible frontend applications. This has involved leveraging libraries such as Radix UI and implementing WCAG ARIA patterns manually to provide robust accessibility features. My goal is to make accessibility a seamless and integrated part of the development process, rather than an afterthought.",
		],
		tags: ["Accessibility", "WCAG", "Component libraries", "UI"],
		projects: [projects.flowUI, projects.wiseflow],
	},
	fullstack: {
		title: "Fullstack",
		subtitle: "I've worked with a variety of technologies",
		content: [
			"Being part of a smaller development team has given me exposure to a wide range of web development areas. I've gained experience in both frontend and backend development, allowing me to be versatile and contribute across the entire stack. I've debugged and developed REST APIs with Golang, worked with GraphQL, and even developed PHP templating and REST endpoints. This breadth of experience makes me a well-rounded developer who can quickly adapt to different challenges and technologies.",
			"My experience across both frontend and backend allows me to collaborate effectively between the two. I understand the needs and challenges of both sides, enabling me to facilitate communication and ensure seamless integration between the frontend UI and the backend API. I believe this cross-functional understanding is crucial for building cohesive and efficient web applications.",
		],
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

// TODO: Frontend tech lead, Python and devex cli

export function generateSkillContent(skill: Skill) {
	const content = `TITLE: ${skill.title} - ${skill.subtitle}\nCONTENT: ${skill.content.join("\n")}\nTAGS: ${skill.tags.join(", ")}`;
	return content;
}

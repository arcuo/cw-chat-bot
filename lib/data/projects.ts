import type { Base } from "../types/base";

export type Project = Base & {
	id: string;
	link?: { href: string; text: string };
	productDescription?: string;
	grade?: string;
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
			"For 8 years I helped deliver the WISEflow digital assessment platform. I was responsible for developing the frontend together with a team of developers. During the development, I became one of the developers with the most knowledge about the platform and its many facets. The code was built with React/Typescript and Golang, but developed on top of a large legacy codebase constisting of PHP, AngularJS, JQuery and more.",
		tags: [
			"EdTech",
			"React",
			"Golang",
			"Frontend",
			"AngularJS",
			"JQuery",
			"Micro frontends",
		],
		link: {
			href: "https://uniwise.eu/about-wiseflow",
			text: "Uniwise Website",
		},
	},
	sdith: {
		id: "sdith",
		title: "SDitH - Post-Quantum Digital Signature Protocol in Rust",
		grade: "12 (US: A+, EU: A)",
		subtitle:
			"Master thesis Rust implementation of the NIST Post-Quantum Signature Scheme contender Syndrome Decoding in the Head (SDitH)",
		productDescription:
			"A project involving the implementation of a post-quantum digital signature protocol in Rust. The project delivered a working post-quantum secure signature scheme CLI and Rust crate for the scheme along with a report on the theoretical background and implementation of the protocol.",
		content:
			"As a Computer Science master's student I focused on Cryptography. Given my technical skills and interests it was a great opportunity to work on a project that involved the implementation of a post-quantum digital signature protocol in Rust. The project gave me the opportunity to learn about the implementation of underlying cryptographic protocols like Secret Sharing, MPC and Code-based cryptography.",
		tags: [
			"Rust",
			"Cryptography",
			"Post-Quantum",
			"Master's Thesis",
			"Computer Science",
		],
		link: {
			text: "Github",
			href: "https://github.com/Mactherobot/sdith-rust/blob/main/sdith/README.md",
		},
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
		link: {
			href: "https://wiseflow.zendesk.com/hc/en-gb/articles/4407007191058-Using-the-Marking-Tool",
			text: "Documentation",
		},
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
	bhlm: {
		id: "bhlm",
		title: "Bayesian Meta Analysis Package for R",
		subtitle:
			"Bachelors project developing a package in the R programming language to perform Meta Analysis using a Bayesian Latent Mixture Model",
		content:
			"Abstract - Scientific research is currently under much pressure from the scientific community as recent studies have indicated that common methods do not give replicable findings. The criticism has recently accelerated with the “replication crisis” of Psychology and the increasing frustration with publication bias. With its increase in popularity, meta-analysis has recently stood as a plausible solution to this crisis of scientific method. However, there are still issues that meta-analysis seem to struggle to solve. With the increase in computational power, Bayesian ideas pose radically different approaches that could solve many of the crisis issues elegantly, but Bayesian methods are still underutilised in meta-analysis. This paper introduces and overviews the BHLM package to R, which utilises hierarchical latent mixture analysis as an approach to meta-analysis. Using a prototype build of the package, I re-analyse two recent meta-analysis studies. The analyses produce negligible effects, similar to the original papers, which supports the validity of the package and the method. However, the method allows for more elaborate analysis based on further developed and theorised priors. In the end, future implementations to the package are discussed. These include, Bayesian bias mitigation and assessment and the package as a stepping tool to introduce Bayesian methods to more researchers. Such introductions, ideally, could lead towards a solution to the current scientific crisis.",
		tags: [
			"Bayesian inference",
			"Meta-analysis",
			"Hierarchical latent mixture model",
			"Reproducibility crisis",
			"Publication bias",
			"R programming language",
		],
		link: {
			href: "https://github.com/arcuo/BHLM_package",
			text: "Github",
		},
		grade: "12 (US: A+, EU: A)",
	},
	ecdsa: {
		id: "ecdsa",
		title: "Threshold ECDSA and Schnorr in Rust",
		subtitle:
			"Implementation of threshold ECDSA and Schnorr in Rust using BeDOZa for circuit MPC evaluation.",
		productDescription:
			"Implementation of the threshold Schnorr signature scheme using BeDOZa for passively secure Two-Party Computation (2PC) with a trusted dealer. This provides an initial stepping stone, as we extended BeDOZa to the secp256k1 elliptic curve, enabling threshold ECDSA signing. We’re using cryptographic libraries from RustCrypto, for secure and efficient elliptic curve operations. We benchmark our implementations to show that threshold ECDSA signing only incurs a minimal (2x) overhead compared to traditional ECDSA signing.",
		content:
			"As a project for the Cryptographic Computing Course at Aarhus University, I collaborated on a project to implement a Threshold Signature Scheme using Multi-Party Computation.",
		grade: "10 (US: B, EU: A/A-)",
		tags: [
			"ECDSA",
			"Schnorr",
			"MPC",
			"Rust",
			"Cryptography",
			"Elliptic Curve Cryptography",
			"BeDOZa",
		],
		link: { href: "https://github.com/mzacho/threshold-ecdsa", text: "GitHub" },
	},
	voting: {
		id: "voting",
		title: "Secure Digital Election System",
		subtitle:
			"Bachelors project implementing a voting system using Multi-Party Computation with Active Security in Golang",
		content:
			"Abstract - With recent developments in computer science, we propose that elections can benefit from digital solutions that utilise cryptographic methods. With  inspiration from auction applications developed with Multiparty Computation (MPC) by Bogetoft et al., we set out to implement a digital election system that upholds the important characteristics of an election, i.e. privacy and integrity,  with MPC in an active security setting. We describe current theories of MPC, Secret Sharing, and Distributed Systems, along with schemes that provide integrity  to the system in the form of verifiability and agreement. We provide two implementations: an implementation with passive security to provide a baseline for  comparison and an active implementation. Benchmarks provided valuable insight  into the performance of our election system and small changes gave dramatic performance increases. While the system still requires a considerable of research, it  provides a preliminary solution to elections in terms of performance and security.",
		link: {
			href: "https://github.com/frederik1904/Digital-Election-System-with-MPC-and-Active-Security",
			text: "GitHub",
		},
		tags: ["MPC", "Computer Science", "Golang"]
	},
} satisfies Record<string, Project>;

// TODO: ThreeJS, RAG AI, DevEx scripts, Ruff linter project

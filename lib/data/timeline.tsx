import type { TimelineEntries } from "@/components/ui/timeline";
import {
	Baby,
	Brush,
	Users,
	NotebookPen,
	BookUser,
	Computer,
	GraduationCap,
} from "lucide-react";
import { projects } from "./projects";

export const workExperience: TimelineEntries = {
	2017: {
		start: 2017,
		end: 2020,
		title: "Student Software Engineer",
		subtitle: "Learning and Collaborating with Feature Development",
		description: {
			main: [
				"Building and learning frontend development in React and Typescript. Collaborating with a team in feature development.",
				"I developed an Automated Testing application for WISEflow using Selenium and Python.",
			],
			learned: ["Collaboration and introductions to software development."],
			tags: [
				"Github",
				"React",
				"Typescript",
				"Docker",
				"AngularJS",
				"Selenium",
				"Testing",
			],
			projects: [projects.wiseflow],
		},
		color: "#94b144",
		icon: <Baby size={15} />,
	},
	2020: {
		start: 2020,
		end: 2021,
		title: "Frontend Developer",
		subtitle: "Feature development and maintenance",
		description: {
			main: [
				"I helped develop frontend solutions for the WISEflow digital exam platform with main focus on React in Typescript. Maintaining old parts of the system in AngularJS/TS, PHP Rain templates, and JQuery.",
				"Self driven development and learning to quickly grasp the structure of a project. Being able to grasp other fields like Backend and DevOps to quickly handle bug fixing, development and planning.",
			],
			learned: [
				"Planning and spearheading development of Micro frontend projects. Large scale maintenance of frontend DevEx and scaling. Collaborating with a team.",
			],
			tags: [
				"Github",
				"React",
				"Typescript",
				"AngularJS",
				"PHP",
				"Golang",
				"REST",
				"Feature development",
			],
			projects: [projects.wiseflow, projects.markingTool],
		},
		color: "#94b144",
		icon: <Brush size={15} />,
	},
	2021: {
		start: 2021,
		end: 2023,
		title: "Frontend Tech Lead",
		subtitle: "Leading the Frontend Community",
		description: {
			main: [
				"I managed the frontend community, including holding regular meetups and pushing knowledge sharing and a passion for modern frontend.",
				"Leading maintenance and upgrades in DevEx and modernising the frontend stack for the company. I helped with bug finding and issue handling and organised meetings and events for the frontend team.",
				"I handled mentoring new frontend developers and planning tasks that allowed the developers to work outside of hard deadlines for the first part of their employment.",
			],
			learned: [
				"Communication and leading collaboration between a team of frontenders. Researching and documenting tools and techniques to keep a frontend stack modern.",
				"Planning and organising maintenance projects on the stack in collaboration with other departments.",
			],
			tags: ["Frontend Community", "Planning", "Leading", "Tech lead"],
			projects: [projects.wiseflow, projects.markingTool, projects.flowUI],
		},
		color: "#94b144",
		icon: <Users size={15} />,
	},
	2023: {
		start: 2023,
		end: 2025,
		title: "Senior Software Engineer",
		subtitle: "Part time during Masters Degree",
		description: {
			main: [
				"In 2023 I went back to the University to continue my development and take a Masters degree in Computer science. This meant that I had to make major changes to my life and work life to accomodate this new role.",
				"I worked part time as a Senior Software Engineer and given that I was the frontender with the most experience, I was able to take more of a consulting role, helping with the higher level design and debugging of the frontend.",
			],
			tags: ["Consultancy", "Mentoring", "Senior Frontend Developer"],
			projects: [projects.markingTool, projects.wiseflow, projects.flowUI],
		},
		color: "#94b144",
		icon: <NotebookPen size={15} />,
	},
};

export const education: TimelineEntries = {
	2015: {
		start: 2015,
		end: 2018,
		title: "Cognitive Science (Ba)",
		subtitle: "Bachelor of Arts",
		color: "rgb(90 110 250)",
		description: {
			main: [
				"I was part of the first batch of students on the newly formed Cognitive Science course. I was introduced to the fundamental theories of cognition. I learned how to design and carry out my own investigations of the human mind, brain, and behavior.",
			],
			learned: [
				"Among other things, I learned about statistical data analysis and computer programming, which enabled me to carry out my own experimental studies and to critically assess previous research results.",
				"I learned how to design and carry out social experiments with Python and how to perform statistical data analysis with the R programming language.",
				"The computational part of the course introduced me to programming which lead to choosing Computer Science as my Elective course and later to complete my Computer Science degrees.",
			],
			tags: ["Cognitive Science", "Statistics", "Python", "R"],
			projects: [projects.bhlm],
			courses: [
				"Experimental methods 1",
				"Experimental methods 2",
				"Experimental methods 3",
				"Computational Modeling for Cognitive Science",
				"Introduction to Cognitive Science",
				"Introduction to Cognitive Neuroscience",
				"Humanities and International electives (HUM- & IV-fag)",
				"Models of perception and action",
				"Cognition and communication",
				"Studium Generale",
				"Mind and consciousness",
				"Social and cultural dynamics in cognition",
			],
		},
		textColor: "#fff",
		icon: <BookUser size={15} />,
	},
	2017: {
		start: 2017,
		end: 2020,
		title: "Computer Science (Ba)",
		subtitle: "Bachelor of Science",
		description: {
			main: [
				"Computer Science centered around the understanding of and working with data and information using computers. It involved everything from writing code to solving problems, analyzing data for insights, and developing new technologies. It was learning the language of computers so that I, as a computer scientist, could collaborate with them to solve problems and create new innovations.",
			],
			learned: [
				"In the Computer Science program, I learned to design, program, and ensure the correctness of software from scratch. I was able to program in a variety of programming languages, handle large amounts of data, and process data with artificial intelligence and visual methods. I also learned methods to prevent cyberattacks - all for the goal to develop user-friendly, flawless, and secure IT solutions.",
			],
			tags: ["Computer Science", "Programming", "Cyber Security"],
			projects: [projects.voting],
			courses: [
				"Introduction to Programming",
				"Introduction to Databases",
				"Foundations of Algorithms and Data Structures",
				"Calculus Alpha",
				"Calculus Beta",
				"Programming Languages",
				"Computability and Logic",
				"Computer Architecture",
				"Networks and Operating Systems",
				"Distributed Systems and Security",
				"Experimental System Development",
				"Philosophy and Ethics of Computer Science and IT",
				"Product Development",
				"Implementation and Applications of Databases",
				"Introduction to Human-Computer Interaction",
				"Optimization",
				"Compilation",
				"Software Engineering and Architecture",
				"Introduction to Probability Theory and Statistics",
				"Linear Algebra",
			],
		},
		color: "rgb(225 118 118)",
		textColor: "#000",
		icon: <Computer size={15} />,
	},
	2023: {
		start: 2023,
		end: 2025,
		title: "Computer Science (Ma)",
		subtitle: "Master of Science with a focus on Cryptography",
		description: {
			main: [
				"The Masters program for Computer Science at Aarhus University continues on the learning and theory from the Bachelors program. It allowed me to choose a specialization in Cryptography and algorithms with courses like Computational Geometry, Cryptography, Cryptographic Computation and Systems Security.",
			],
			learned: [
				"I learned about the advanced theories and mathematical practices that are used in state of the art Cryptography. It allowed me to finish my Masters with a project developing Post-Quantum Cryptography for Digital Signatures in the Rust programming language.",
			],
			courses: [
				"Cryptology",
				"Computational Geometry: Theory and Experimentation",
				"Randomized Algorithms",
				"Advanced Augmented Reality",
				"Augmented Reality",
				"Cryptographic Computing",
				"Deep Learning for Visual Recognition",
				"Language-Based Security",
				"Quantum Information Processing",
				"Systems Security",
			],
			projects: [projects.ecdsa, projects.sdith],
			tags: ["Computer Science", "Cryptography"],
		},
		color: "rgb(225 118 218)",
		textColor: "#000",
		icon: <GraduationCap size={15} />,
	},
};

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
				<>
					<label htmlFor="student-frontend-dev" className="font-bold text-sm">
						Responsibilities
					</label>
					<div id="student-frontend-dev">
						Developed and maintained frontend solutions for the WISEflow digital
						exam platform, primarily using React and TypeScript. Also
						responsible for maintaining legacy systems built with AngularJS/TS,
						PHP Rain templates, and jQuery.
					</div>
				</>,
			],
			learned: [
				<>
					Gained foundational experience in collaborative software development
					practices, including team communication, version control, and agile
					methodologies.
				</>,
				"Introductions to software development and feature development at scale.",
			],
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
		title: "Senior Frontend Developer",
		subtitle: "Feature development and maintenance",
		description: {
			main: [
				<>
					<label htmlFor="frontend-dev" className="font-bold text-sm">
						Frontend Development for WISEflow
					</label>
					<div id="frontend-dev">
						Developed and maintained frontend solutions for the WISEflow digital
						exam platform, primarily using React and TypeScript. Also
						responsible for maintaining legacy systems built with AngularJS/TS,
						PHP Rain templates, and jQuery.
					</div>
				</>,
				<>
					<label htmlFor="frontend-dev2" className="font-bold text-sm">
						Full-Stack Aptitude
					</label>
					<div id="frontend-dev2">
						Demonstrated self-driven learning and rapid adaptation to new
						projects, enabling quick understanding of project structure.
						Proactively expanded knowledge into Backend and DevOps domains to
						efficiently handle bug fixes, development tasks, and project
						planning.
					</div>
				</>,
			],
			learned: [
				"Planning and development of micro frontend projects, gained experience in large-scale frontend developer experience (DevEx) maintenance and scaling, and honed collaboration skills in a team environment.",
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
				<>
					<label htmlFor="frontend-community" className="font-bold text-sm">
						Frontend Community & Technical Leadership
					</label>
					<div id="frontend-community">
						Managed the frontend community, increasing engagement through
						regular meetups, knowledge sharing initiatives, and a focus on
						modern frontend practices.
					</div>
				</>,
				<>
					<label htmlFor="frontend-community2" className="font-bold text-sm">
						Technical Advancement & Mentorship
					</label>
					<div id="frontend-community2">
						improving developer experience (DevEx) and reducing technicaldebt
						through strategic maintenance and upgrades. Provided mentorship to
						junior developers, enhancing their skills in debugging and issue
						resolution.
					</div>
				</>,
				<>
					<label htmlFor="frontend-community3" className="font-bold text-sm">
						Key Achievements
					</label>
					<div
						id="frontend-community3"
						className="[&>p:not(:first-child)]:mt-2"
					>
						<div>
							Improved team communication and collaboration, streamlined
							frontend development processes through research and documentation
							of modern technologies, and successfully planned and executed
							cross-departmental maintenance projects.
						</div>
						<div>
							Communication and leading collaboration between a team of
							frontenders. Researching and documenting tools and techniques to
							keep a frontend stack modern.
						</div>
						<div>
							Planning and organising maintenance projects on the stack in
							collaboration with other departments.
						</div>
					</div>
				</>,
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
				<>
					<label htmlFor="partime" className="font-bold text-sm">
						Continuation of my education
					</label>
					<div id="partime">
						In 2023 I went back to the University to continue my development and
						take a Masters degree in Computer science. This meant that I had to
						make major changes to my life and work life to accomodate this new
						role.
					</div>
				</>,
				<div>
					I worked part time as a Senior Software Engineer and given that I was
					the frontender with the most experience, I was able to take more of a
					consulting role, helping with the higher level design and debugging of
					the frontend.
				</div>,
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
		icon: <GraduationCap size={15} />,
	},
};

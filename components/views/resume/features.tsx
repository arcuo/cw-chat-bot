import { FeatureTag } from "@/components/ui/featureTag";

export const Features = () => {
	return (
		<>
			<FeatureTag
				title="WCAG AA"
				description={
					<>
						This page is fully WCAG AA compliant in accessibility. If you're
						interested, checkout the{" "}
						<a
							href="https://www.deque.com/axe/devtools/"
							target="_blank"
							className="regular-link"
							rel="noreferrer"
						>
							Axe DevTools
						</a>{" "}
						for a report of the accessibility of this page. Much of the
						accessibility is ensured through the use of{" "}
						<a
							href="https://radix-ui.com"
							target="_blank"
							className="regular-link"
							rel="noreferrer"
						>
							Radix UI
						</a>
						.
					</>
				}
			/>
			<FeatureTag
				title="Responsive"
				description="Developed to be responsive for both desktop and mobile."
			/>
			<FeatureTag
				title="Framer Motion"
				description={
					<>
						Animations are built with{" "}
						<a
							href="https://www.framer.com/motion/"
							target="_blank"
							className="regular-link"
							rel="noreferrer"
						>
							Framer Motion
						</a>
					</>
				}
			/>
			<FeatureTag
				title="NextJS"
				description={
					<>
						Built with{" "}
						<a
							href="https://nextjs.org/"
							target="_blank"
							className="regular-link"
							rel="noreferrer"
						>
							NextJS
						</a>{" "}
						and deployed with{" "}
						<a
							href="https://vercel.com/"
							target="_blank"
							className="regular-link"
							rel="noreferrer"
						>
							Vercel
						</a>
						.
					</>
				}
			/>
			<FeatureTag
				title="Tailwind CSS"
				description={
					<>
						Built with{" "}
						<a
							className="regular-link"
							href="https://tailwindcss.com/"
							target="_blank"
							rel="noreferrer"
						>
							Tailwind CSS
						</a>
					</>
				}
			/>
			<FeatureTag
				title="Typescript"
				description="Written with typesafe code in TypeScript."
			/>
			<FeatureTag
				title="AI/RAG tailored resume"
				description={
					<>
						You can tailor the resume to the job you're listing or what you're
						interested in! I've developed a system using{" "}
						<a
							href="https://gemini.google.com/app"
							target="_blank"
							className="regular-link"
							rel="noreferrer"
						>
							Gemini
						</a>{" "}
						and{" "}
						<a
							href="https://sdk.vercel.ai/docs/introduction"
							target="_blank"
							className="regular-link"
							rel="noreferrer"
						>
							Vercel AI SDK
						</a>{" "}
						to allow you to chat with agents (RAG) that tailor the resume to be
						more streamlined to your needs!
					</>
				}
			/>
			<FeatureTag
				title="PostgreSQL"
				description={
					<>
						Taking advantage of <pre className="inline font-bold">pgvector</pre>{" "}
						for storing embeddings on the information available on the page, AI
						agents can grasp the information that you want to know about "me".
						Ideally, this will be done using the{" "}
						<a
							className="regular-link"
							href="https://neon.tech/"
							target="_blank"
							rel="noreferrer"
						>
							Neon Serverless Postgres
						</a>
					</>
				}
			/>
			<FeatureTag
				title="Page transitions"
				description={
					<>
						Neat Page transitions are handled with{" "}
						<a
							href="https://www.framer.com/motion/"
							target="_blank"
							className="regular-link"
							rel="noreferrer"
						>
							Framer Motion
						</a>
						.
					</>
				}
				todo
			/>
		</>
	);
};

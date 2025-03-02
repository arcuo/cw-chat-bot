"use server";

import { AISDKError, generateObject, generateText, tool } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { findRelevantContent } from "@/lib/db/utils/embedding";
import * as resumeDb from "@/lib/db/utils/resumes";
import { ResumeRequestSchema, ResumeSchema } from "@/lib/schemas/resume";
import { type NextRequest, NextResponse } from "next/server";
import { DrizzleError } from "drizzle-orm";

const system = ({ userInfo, userQuery }: z.infer<typeof ResumeRequestSchema>) =>
	`# CONTEXT
## USER_INFORMATION - Information about the user
${userInfo}
## USER_QUERY - What the user wants to know
${userQuery}
# GOALS
 -  Generate a functional resume for me "Hugh Benjamin Zachariae", tailored for the user based on the USER_INFORMATION and USER_QUERY.
 -  Generate sections like: Projects, Skills, Education, Work Experience.
 -  Start the resume with a short introduction with underlines how I might be a good fit for the user.
 -  Use the USER_INFORMATION and USER_QUERY to generate the resume.
 -  Use the getInformation tool to get information from the knowledge base about Hugh Benjamin Zachariae.
 -  Leave out any information that is not relevant to the user.
 -  Leave out contact information, name and email.

 # CONSTRAINTS
 - Any information or points must stem from the knowledge base. I.e. you cannot make up information unless it is in the knowledge base.

 # OUTPUT
 A resume with the following sections
 - Introduction
 - Skills
 - Projects
 - Work Experience
 - Education

 # FORMATTING
 Markdown format with example headers "# Section Title" and "## Sub-section title"
 "//" below indicates comments but they should not be included in the output

 # EXAMPLE
 """
 # A Frontend Specialist // Intriguing title

 _8 years of frontend experience_ // sub title in italic 

 I'm a frontend specialist with 10 years of experience in React, Next.js, and TypeScript. I have a strong background in building user-friendly and responsive web applications. I am proficient in using modern JavaScript frameworks and libraries, such as React, Next.js, and Redux. I am also familiar with popular CSS frameworks like Tailwind CSS and Material-UI.

 ## Skills
_Versatile skill set and apt learner_ // intriguing sub-title in italic

 - Languages: JavaScript, TypeScript, HTML, CSS, Rust, Python, Golang
 - Frameworks: React, Next.js, Tailwind CSS, Tanstack
 - Cryptographic computing and Post-Quantum Cryptography
 - Testing with Vitest, Cypress

 ... # more stuff

## TL;DR
// Intriguing ending and summary why you are a good fit for the role
"""
`.trim();

export async function POST(req: NextRequest) {
	const request = ResumeRequestSchema.safeParse(await req.json());
	if (!request.success) {
		return new NextResponse(JSON.stringify(request.error), {
			status: 400,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	try {
		const { text, steps } = await generateText({
			model: google("gemini-2.0-flash-exp"),
			system: system(request.data),
			prompt: "Generate a functional resume for me with information from the knowledge base",
			temperature: 0.4,
			maxSteps: 10,
			tools: {
				knowledgeSpace: tool({
					description:
						"knowlegde space to get information about Hugh Benjamin Zachariae from the knowledge base to generate the tailored resume",
					parameters: z.object({
						queries: z
							.array(z.string())
							.describe("pieces of information needed to generate the resume"),
					}),
					execute: async ({ queries }) => findRelevantContent(queries, 15, 0.4),
				}),
			},
			maxTokens: 10000,
			// onStepFinish: (step) => {
			// 	console.log("Step name:", step.stepType);
			// 	console.log("Step output:", step.text);
			// 	if (step.toolCalls) {
			// 		for (const i in step.toolCalls) {
			// 			const toolCall = step.toolCalls[i];
			// 			const toolResult = step.toolResults[i];
			// 			console.log(
			// 				`Used tool ${toolCall.toolName} with ${JSON.stringify(toolCall.args)}`,
			// 			);
			// 			console.log(`Tool result: ${JSON.stringify(toolResult)}`);
			// 		}
			// 	}
			// },
		});

		// Add resume to database
		console.log(steps);

		if (text.length === 0) {
			return new NextResponse("Could not generate resume", { status: 500 });
		}

		const hash = await resumeDb.insertResume(text);

		return NextResponse.json({
			hash,
			text,
		});
	} catch (e) {
		if (e instanceof DrizzleError)
			console.error("Database error", JSON.stringify(e));
		if (e instanceof AISDKError) console.error("AI error", JSON.stringify(e));

		return new NextResponse("Server error", { status: 500 });
	}
}

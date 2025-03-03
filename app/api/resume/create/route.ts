"use server";

import { AISDKError, generateObject, generateText, tool } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { findRelevantContent } from "@/lib/db/utils/embedding";
import * as resumeDb from "@/lib/db/utils/resumes";
import { ResumeRequestSchema, ResumeSchema } from "@/lib/types/resume";
import { type NextRequest, NextResponse } from "next/server";
import { DrizzleError } from "drizzle-orm";
import type { EmbeddingTitle } from "@/lib/db/schema/embeddings";

const sections: (EmbeddingTitle | "introduction")[] = [
	"introduction",
	"skills",
	"personality",
];

const system = ({ userInfo, userQuery }: z.infer<typeof ResumeRequestSchema>) =>
	`
# CONTEXT
You are generating a resume in a professional and engaging style.
Information about the user who is asking for the resume is "${userInfo}"
What the user wants to know about Hugh Benjamin Zachariae is "${userQuery}"

## CONSTRAINTS
- Any information or points must stem from the knowledge base. 
- I.e. you cannot make up information unless it is in the knowledge base.
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
		const messages = (
			await Promise.all(
				sections.map(async (section) =>
					generateText({
						model: google("gemini-2.0-flash-exp"),
						system: system(request.data),
						prompt: `
Generate a section with the subject ${section} of a resume in a professional and engaging style.
Generate a title, subtitle, and body for the section.
	`.trim(),
						temperature: 0.4,
						maxSteps: 10,
						tools: {
							knowledgeSpace: tool({
								description:
									"knowlegde space to get information about Hugh Benjamin Zachariae from the knowledge base to generate the tailored resume",
								parameters: z.object({
									queries: z
										.array(z.string())
										.describe(
											"pieces of information needed to generate the resume",
										),
								}),
								execute: async ({ queries }) =>
									findRelevantContent(
										queries,
										15,
										0.4,
										section === "introduction" ? "all" : section,
									),
							}),
						},
						maxTokens: 10000,
					}),
				),
			)
		).flatMap(({ steps }) => steps);

		const { object } = await generateObject({
			model: google("gemini-2.0-flash-exp"),
			system: system(request.data),
			prompt: `Generate resume object from the following context: ${messages.map((m) => m.text).join(", ")}`,
			schema: ResumeSchema,
		});

		// Add resume to database

		const hash = await resumeDb.insertResume(object);

		return NextResponse.json({
			hash,
			resume: object,
		});
	} catch (e) {
		if (e instanceof DrizzleError)
			console.error("Database error", JSON.stringify(e));
		if (e instanceof AISDKError) console.error("AI error", JSON.stringify(e));

		return new NextResponse("Server error", { status: 500 });
	}
}

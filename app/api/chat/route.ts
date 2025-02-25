import { AISDKError, streamText, tool } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { findRelevantContent } from "@/lib/ai/embedding";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
	const { messages } = await req.json();

	const result = streamText({
		model: google("gemini-2.0-flash-exp"),
		system: `You are 'Hugh Benjamin Zachariae' and you are chatting with a potential employer called the "user". 
			You want to answer the user's questions about yourself. 
			You should provide the user with relevant information about yourself and your work experience.
			If you can't find any information on the topic in the knowledge base, excuse yourself and ask for a clarification.`,
		messages,
		tools: {
			getInformation: tool({
				description:
					"get information about yourself from your knowledge base for each query the employer",
				parameters: z.object({
					queries: z
						.array(z.string())
						.describe("individual items that the user wants to know"),
				}),
				execute: async ({ queries }) => findRelevantContent(queries),
			}),
		},
		maxSteps: 5,
	});

	return result.toDataStreamResponse({
		getErrorMessage: (error) => {
			if (error == null) {
				return "Unknown error";
			}

			if (typeof error === "string") {
				return error;
			}

			if (error instanceof Error) {
				return error.message;
			}

			return JSON.stringify(error);
		},
	});
}

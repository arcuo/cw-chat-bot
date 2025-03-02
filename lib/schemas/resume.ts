import { z } from "zod";

export const ResumeRequestSchema = z.object({
	userInfo: z
		.string()
		.min(1, "Cannot tailor the resume without some info about you")
		.describe("Description of the user"),
	userQuery: z.string().optional().describe("What the user wants to know"),
});

export const ResumeSchema = z
	.object({
		title: z.string().describe("The title of the resume"),
		introduction: z.object({
			title: z.string().describe("The title of the introduction section"),
			subtitle: z.string().describe("The subtitle of the introduction section"),
			content: z.string().describe("The content of the introduction section"),
		}),
		skills: z
			.array(
				z.object({
					title: z.string().describe("The title of the skill"),
					subtitle: z.string().describe("The subtitle of the skill"),
					content: z.string().describe("The content of the skill"),
				}),
			)
			.describe("The skills section of the resume"),
		projects: z
			.array(
				z.object({
					title: z.string().describe("The title of the project"),
					subtitle: z.string().describe("The subtitle of the project"),
					content: z.string().describe("The content of the project"),
				}),
			)
			.describe("The projects section of the resume"),
		personality: z
			.object({
				title: z.string().describe("The title of the personality section"),
				subtitle: z
					.string()
					.describe("The subtitle of the personality section"),
				content: z.string().describe("The content of the personality section"),
			})
			.describe("The personality section of the resume"),
	})
	.describe("Resume output");

export type Resume = z.infer<typeof ResumeSchema>;

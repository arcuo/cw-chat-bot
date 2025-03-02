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
		workexperience: z
			.array(
				z.object({
					title: z.string().describe("The title of the work experience"),
					subtitle: z.string().describe("The subtitle of the work experience"),
					content: z.string().describe("The content of the work experience"),
				}),
			)
			.describe("The work experience section of the resume"),
		education: z.array(
			z.object({
				title: z.string().describe("The title of the education"),
				subtitle: z.string().describe("The subtitle of the education"),
				content: z.string().describe("The content of the education"),
			}),
		),
	})
	.describe("Resume output");

export type Resume = z.infer<typeof ResumeSchema>;

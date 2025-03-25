"use server";

import { projects } from "@/lib/data/projects";
import {
	projectAndSkillSimilarity,
	similarityToRelevance,
} from "@/lib/data/similarity";
import { skills } from "@/lib/data/skills";
import { db } from "@/lib/db";
import { resumes } from "@/lib/db/schema/resumes";
import { google } from "@ai-sdk/google";
import { generateObject, generateText } from "ai";
import { eq } from "drizzle-orm";
import { z } from "zod";

export async function createResume(req: { prompt: string }) {
	const validation = z
		.object({
			prompt: z.string().min(12),
		})
		.safeParse(req);

	if (!validation.success) {
		throw validation.error;
	}

	const { skillSimilarity, projectSimilarity } =
		await projectAndSkillSimilarity(validation.data.prompt);

	const { title, coverLetter } = await generateCoverLetter(
		validation.data.prompt,
		{ skillSimilarity, projectSimilarity },
	);

	// Save resume to db
	const resume = {
		title: title.object,
		cover: coverLetter.text,
		prompt: validation.data.prompt,
		skillSimilarities: skillSimilarity.map(({ key, similarity }) => ({
			key,
			similarity,
		})),
		projectSimilarities: projectSimilarity.map(({ key, similarity }) => ({
			key,
			similarity,
		})),
	};

	try {
		const [_resume] = await db
			.insert(resumes)
			.values(resume)
			.returning();
		return { id: _resume.id };
	} catch (e) {
		throw new Error("Failed to save resume");
	}
}

const resumeTitleSchema = z.object({
	pageTitle: z.string().describe("Catchy title to put in the meta data"),
	subtitle: z
		.object({
			prefix: z
				.string()
				.describe(
					"Prefix of the subtitle which should come before the 'words'",
				),
			words: z
				.array(z.string())
				.describe(
					"4 words to input into the subtitle prefix + word[0] + suffix. The words should fit in the full title",
				),
			suffix: z
				.string()
				.describe("Suffix of the subtitle which should come after the 'words'"),
		})
		.describe("Catchy subtitle of max 40 characters"),
	words: z
		.array(z.string())
		.describe('4 words to input into the title "Hi! I\'m a [blank] Developer"'),
});

export type ResumeTitle = z.infer<typeof resumeTitleSchema>;

async function generateCoverLetter(
	prompt: string,
	similarity: Awaited<ReturnType<typeof projectAndSkillSimilarity>>,
) {
	"no cache";
	const { skillSimilarity, projectSimilarity } = similarity;

	// Pick 3 most similar for each
	const skills = skillSimilarity.slice(0, 3);
	const projects = projectSimilarity.slice(0, 3);

	const coverLetterPromise = generateText({
		model: google("gemini-2.0-flash-exp"),
		prompt:
			`Generate a 1-2 paragraphs of at most 750 characters cover letter that advocates "me". Base the cover letter on the following skills, projects and the users prompt. Dont include starting statements like "dear recruiter" or "to whom it may concern".
Skills: ${skills.map((s) => `"${s.content}"`).join(", ")}
Projects: ${projects.map((p) => `"${p.content}"`).join(", ")}
Prompt: ${prompt}

Cover letter:`.trim(),
	});

	const titlePromise = generateObject({
		model: google("gemini-2.0-flash-exp"),
		prompt:
			`Generate 4 words to input into the title "Hi! I'm a [blank] Developer". Furthermore, generate a catching subtitle sentence of max 40 characters split into a prefix, 4 interchangable words, and a suffix. 

Base the content on the following skills, projects and the users prompt.
Skills: ${skills.map((s) => `"${s.content}"`).join(", ")}
Projects: ${projects.map((p) => `"${p.content}"`).join(", ")}
Prompt: ${prompt}`.trim(),
		schema: resumeTitleSchema,
	});

	const [coverLetter, title] = await Promise.all([
		coverLetterPromise,
		titlePromise,
	]);

	return {
		title,
		coverLetter,
	};
}

export const getResume = async (id: string) => {
	const resume = await db.query.resumes.findFirst({
		where: eq(resumes.id, Number(id)),
	});

	if (!resume) {
		throw new Error("Not found");
	}

	const ratedSkills = Object.entries(resume.skillSimilarities).map(
		([_, s]) => ({
			...skills[s.key as keyof typeof skills],
			similarity: s.similarity,
			relevance: similarityToRelevance(s.similarity),
		}),
	);

	const ratedProjects = Object.entries(resume.projectSimilarities).map(
		([_, p]) => ({
			...projects[p.key as keyof typeof projects],
			similarity: p.similarity,
			relevance: similarityToRelevance(p.similarity),
		}),
	);

	return { ...resume, skills: ratedSkills, projects: ratedProjects };
};

import { cosineDistance, desc, sql } from "drizzle-orm";
import { generateEmbedding } from "../db/utils/embedding";
import { projectsSchema } from "../db/schema/projects";
import { db } from "../db";
import { skillsSchema } from "../db/schema/skills";
import type { RelevanceScore } from "@/components/ui/relevanceIndicator";

export type Similarity = {
	key: string;
	similarity: number;
	content: string;
};

/** Measure cosine similarity between the embeeding of the user query and the embedding of a given project or skill and output relevance score */
export async function projectAndSkillSimilarity(userQuery: string) {
	const userQueryEmbedded = await generateEmbedding(userQuery);

	const similarity = (column: Parameters<typeof cosineDistance>[0]) =>
		sql<number>`1 - (${cosineDistance(column, userQueryEmbedded)})`;

	const projectSimilarity = await db
		.select({
			key: projectsSchema.key,
			content: projectsSchema.content,
			similarity: similarity(projectsSchema.embedding),
		})
		.from(projectsSchema)
		.orderBy(desc(similarity(projectsSchema.embedding)));

	const skillSimilarity = await db
		.select({
			key: skillsSchema.key,
			content: skillsSchema.content,
			similarity: similarity(skillsSchema.embedding),
		})
		.from(skillsSchema)
		.orderBy(desc(similarity(skillsSchema.embedding)));

	return { projectSimilarity, skillSimilarity };
}

export const similarityToRelevance = (similarity: number): RelevanceScore => {
	return Math.min(10, Math.round(similarity * 10) + 1) as RelevanceScore;
};

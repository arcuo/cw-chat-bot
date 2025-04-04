import { embed, embedMany } from "ai";
import { google } from "@ai-sdk/google";
import { and, cosineDistance, desc, eq, gt, sql } from "drizzle-orm";
import { embeddings, type EmbeddingTitle } from "../schema/embeddings";
import { db } from "..";

const embeddingModel = google.textEmbeddingModel("text-embedding-004");

export const generateEmbeddings = async (
	chunks: string[],
): Promise<Array<{ embedding: number[]; content: string }>> => {
	const { embeddings } = await embedMany({
		model: embeddingModel,
		values: chunks,
	});
	return embeddings.map((e, i) => ({ content: chunks[i], embedding: e }));
};

export const generateEmbedding = async (value: string): Promise<number[]> => {
	const input = value.replaceAll("\\n", " ");
	const { embedding } = await embed({
		model: embeddingModel,
		value: input,
	});
	return embedding;
};

export const findRelevantContent = async (
	queries: string[],
	limit = 4,
	threshold = 0.5,
	title: EmbeddingTitle | "all" = "all",
) => {
	return Promise.all(
		queries.map((query) =>
			findRelevantContentForQuery(query, limit, threshold, title),
		),
	);
};

export const findRelevantContentForQuery = async (
	/** The user query */
	userQuery: string,
	/** The number of guides to return */
	limit = 4,
	threshold = 0.5,
	title: EmbeddingTitle | "all" = "all",
) => {
	// Embed the user query
	const userQueryEmbedded = await generateEmbedding(userQuery);

	// Find the most similar embeddings to the user query
	const similarity = sql<number>`1 - (${cosineDistance(
		embeddings.embedding,
		userQueryEmbedded,
	)})`;

	// Get the top most similar guides
	const similarGuides = await db
		.select({ name: embeddings.content, similarity })
		.from(embeddings)
		.where(
			title === "all"
				? gt(similarity, threshold)
				: and(gt(similarity, threshold), eq(embeddings.title, title)),
		)
		.orderBy((t) => desc(t.similarity))
		.limit(limit);

	return similarGuides.map((guide) => ({
		query: userQuery,
		content: guide.name,
		similarity: guide.similarity,
	}));
};

import { embed, embedMany } from "ai";
import { google } from "@ai-sdk/google";
import { cosineDistance, desc, gt, sql } from "drizzle-orm";
import { embeddings } from "../db/schema/embeddings";
import { db } from "../db";
import path from "node:path";
import fs from "node:fs";

const embeddingModel = google.textEmbeddingModel("text-embedding-004");

const generateChunks = (input: string): string[] => {
	return input
		.trim()
		.split(".")
		.filter((i) => i !== "");
};

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
	/** The user query */
	userQuery: string,
	/** The number of guides to return */
	limit = 4,
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
		.where(gt(similarity, 0.5))
		.orderBy((t) => desc(t.similarity))
		.limit(limit);
	return similarGuides;
};

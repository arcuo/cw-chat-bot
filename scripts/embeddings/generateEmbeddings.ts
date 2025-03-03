// Purpose: Generate embeddings from the "./resume_files" directory text files

import { db } from "@/lib/db";
import { embeddings, type EmbeddingTitle } from "@/lib/db/schema/embeddings";
import { generateEmbeddings } from "@/lib/db/utils/embedding";
import fs from "node:fs";

const getFilesFromDirectory = (
	directory = "lib/data/descriptions",
): string[] => {
	const files = fs.readdirSync(directory);
	return files
		.filter((file) => file.endsWith(".txt"))
		.map((file) => `${directory}/${file}`);
};

const generateChunksFromFile = (path: string): string[] => {
	const file = fs.readFileSync(path, "utf-8").trim();
	const prefix = path.split("/").pop()?.replace("_", " ").replace(".txt", "");
	const lines = file.split("\n");
	return lines.map((line) => `${prefix}: ${line}`);
};

async function main(clear = true) {
	const files = getFilesFromDirectory();
	const allFileEmbeddings = [];

	if (clear) {
		console.log("Clearing embeddings tables");
		await db.delete(embeddings);
	}

	console.log("Processing files");
	for (const file of files) {
		const tableName = file
			.split("/")
			.pop()
			?.replace(".txt", "") as EmbeddingTitle;

		console.log(`Processing file: ${tableName}`);
		const chunksFromFile = generateChunksFromFile(file);
		const fileEmbeddings = await generateEmbeddings(chunksFromFile);
		allFileEmbeddings.push(
			...fileEmbeddings.map((e) => ({ ...e, title: tableName })),
		);
	}

	console.log("Inserting embeddings");
	try {
		await db.insert(embeddings).values(allFileEmbeddings);
	} catch (e) {
		if (e instanceof Error)
			console.error(
				e.message.length > 0 ? e.message : "Error, please try again.",
			);
		process.exit(1);
	}

	console.log("Done!");
}

main();

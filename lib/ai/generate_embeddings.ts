// Purpose: Generate embeddings from the "./resume_files" directory text files
// TODO: Clear embeddings table before running this script
import fs from "node:fs";
import { generateEmbeddings } from "./embedding";
import { db } from "../db";
import { embeddings } from "../db/schema/embeddings";

const getFilesFromDirectory = (directory = "lib/ai/resume_files"): string[] => {
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
	const chunks: string[] = [];

    if (clear) {
		console.log("Clearing embeddings table");
		await db.delete(embeddings);
	}

	console.log("Processing files");
	for (const file of files) {
		const chunksFromFile = generateChunksFromFile(file);
		chunks.push(...chunksFromFile);
	}

	console.log("Embedding chunks");
	const fileEmbeddings = await generateEmbeddings(chunks);
	console.log("Adding embeddings to database");

	try {
		await db.insert(embeddings).values(fileEmbeddings);
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

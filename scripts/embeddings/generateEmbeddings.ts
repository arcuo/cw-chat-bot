// Purpose: Generate embeddings from the "./resume_files" directory text files

import { generateProjectContent, projects } from "@/lib/data/projects";
import { generateSkillContent, skills } from "@/lib/data/skills";
import { db } from "@/lib/db";
import { embeddings, type EmbeddingTitle } from "@/lib/db/schema/embeddings";
import { projectsSchema } from "@/lib/db/schema/projects";
import { skillsSchema } from "@/lib/db/schema/skills";
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

async function descriptionEmbeddings(clear = true) {
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

async function skillEmbeddings(clear = true) {
	const contents = Object.entries(skills).map(([key, skill]) => ({
		content: generateSkillContent(skill),
		key,
	}));

	if (clear) {
		console.log("Clearing skills embeddings table");
		await db.delete(skillsSchema);
	}

	console.log("Generating skills embeddings");
	const skillsEmbeddings = await generateEmbeddings(
		contents.map((c) => c.content),
	);

	const rows = skillsEmbeddings.map((e, i) => ({
		...e,
		key: contents[i].key,
	}));

	console.log("Inserting skills embeddings");
	try {
		await db.insert(skillsSchema).values(rows);
	} catch (e) {
		if (e instanceof Error)
			console.error(
				e.message.length > 0 ? e.message : "Error, please try again.",
			);
		process.exit(1);
	}

	console.log("Done!");
}

async function projectEmbeddings(clear = true) {
	const contents = Object.entries(projects).map(([key, project]) => ({
		content: generateProjectContent(project),
		key,
	}));

	if (clear) {
		console.log("Clearing projects embeddings table");
		await db.delete(projectsSchema);
	}

	console.log("Generating projects embeddings");
	const projectsEmbeddings = await generateEmbeddings(
		contents.map((c) => c.content),
	);

	const rows = projectsEmbeddings.map((e, i) => ({
		...e,
		key: contents[i].key,
	}));

	console.log("Inserting projects embeddings");
	try {
		await db.insert(projectsSchema).values(rows);
	} catch (e) {
		if (e instanceof Error)
			console.error(
				e.message.length > 0 ? e.message : "Error, please try again.",
			);
		process.exit(1);
	}

	console.log("Done!");
}

function main() {
	// console.log("Generating embeddings from descriptions");
	// descriptionEmbeddings();

	console.log("Generating embeddings from skills");
	skillEmbeddings();

	console.log("Generating embeddings from projects");
	projectEmbeddings();
}

main();

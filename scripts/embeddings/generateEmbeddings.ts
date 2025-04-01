// Purpose: Generate embeddings from the "./resume_files" directory text files

import { generateProjectContent, projects } from "@/lib/data/projects";
import { generateSkillContent, skills } from "@/lib/data/skills";
import { db } from "@/lib/db";
import { projectsSchema } from "@/lib/db/schema/projects";
import { skillsSchema } from "@/lib/db/schema/skills";
import { generateEmbeddings } from "@/lib/db/utils/embedding";

export async function skillEmbeddings(
	{ clear }: { clear?: boolean } = { clear: true },
) {
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
}

export async function projectEmbeddings(
	{ clear }: { clear?: boolean } = { clear: true },
) {
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
}

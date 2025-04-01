import { env } from "@/lib/env.mjs";

import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import {
	projectEmbeddings,
	skillEmbeddings,
} from "@/scripts/embeddings/generateEmbeddings";
import { prompts } from "../data/prompts";
import { createResume } from "@/app/resume/resumeAction";
import { baseResumes, resumes } from "./schema/resumes";

const runMigrate = async () => {
	if (!env.DATABASE_URL) {
		throw new Error("DATABASE_URL is not defined");
	}

	const connection = postgres(env.DATABASE_URL, { max: 1 });

	const db = drizzle(connection);

	console.log("⏳ Running migrations...");

	const start = Date.now();

	await migrate(db, { migrationsFolder: "lib/db/migrations" });

	const end = Date.now();

	console.log("✅ Migrations completed in", end - start, "ms");

	// Add embeddings to the database
	console.log("⏳ Adding embeddings to the database...");

	await skillEmbeddings({ clear: true });
	await projectEmbeddings({ clear: true });

	console.log("✅ Embeddings added to the database");

	// Add base resumes
	console.log("⏳ Clearing old resumes from the database...");
	await db.delete(baseResumes);
	await db.delete(resumes);

	console.log("⏳ Adding base resumes to the database...");
	const rs = await Promise.all(
		Object.values(prompts).map(async ({ prompt, title }) => {
			return { ...(await createResume({ prompt })), prompt, title };
		}),
	);

	await db.insert(baseResumes).values(rs.map(({ hash, title }) => ({ hash, title })));

  console.log("✅ Base resumes added to the database");

	process.exit(0);
};

runMigrate().catch((err) => {
	console.error("❌ Migration failed");
	console.error(err);
	process.exit(1);
});

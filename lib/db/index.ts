import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { env } from "@/lib/env.mjs";

// Schemas
import { resumes, baseResumes } from "./schema/resumes";
import { projectsSchema } from "./schema/projects";
import { skillsSchema } from "./schema/skills";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const schema = {
	resumes,
	baseResumes,
	projects: projectsSchema,
	skills: skillsSchema,
};

export const db =
	env.NODE_ENV === "development"
		? drizzle(postgres(env.DATABASE_URL), {
				schema,
			})
		: drizzleNeon(neon(env.DATABASE_URL), {
				schema,
			});

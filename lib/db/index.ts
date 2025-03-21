import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { env } from "@/lib/env.mjs";

// Schemas
import * as resumes from "./schema/resumes";
import { projectsSchema } from "./schema/projects";
import { skillsSchema } from "./schema/skills";

const client = neon(env.DATABASE_URL);
export const db = drizzle(client, {
	schema: {
		...resumes,
		projects: projectsSchema,
		skills: skillsSchema,
	},
});

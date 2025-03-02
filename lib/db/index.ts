import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/lib/env.mjs";

// Schemas
import * as resumes from "./schema/resumes";
import * as embeddings from "./schema/embeddings";

const client = postgres(env.DATABASE_URL);
export const db = drizzle(client, {
	schema: { ...resumes, ...embeddings },
});

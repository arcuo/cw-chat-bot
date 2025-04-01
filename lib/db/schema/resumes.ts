import type { ResumeTitle } from "@/app/resume/resumeAction";
import type { Similarity } from "@/lib/data/similarity";
import type { InferSelectModel } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";

export type Resume = InferSelectModel<typeof resumes>;

type DBSimilarity = Omit<Similarity, "content">;

/** Stores resumes by their hash */
export const resumes = t.pgTable("resumes", {
	id: t.serial("id").primaryKey(),
	hash: t.varchar("hash", { length: 32 }).notNull().unique(),
	createdAt: t.timestamp("createdAt").defaultNow().notNull(),
	title: t.jsonb("title").$type<ResumeTitle>().notNull(),
	prompt: t.text("prompt").notNull(),
	cover: t.text("cover").notNull(),
	skillSimilarities: t
		.jsonb("skillSimilarities")
		.$type<DBSimilarity[]>()
		.notNull(),
	projectSimilarities: t
		.jsonb("projectSimilarities")
		.$type<DBSimilarity[]>()
		.notNull(),
});

export const baseResumes = t.pgTable("base_resumes", {
	id: t.serial("id").primaryKey(),
	hash: t
		.varchar("hash", { length: 32 })
		.notNull()
		.references(() => resumes.hash),
	title: t.text("title").notNull(),
});
